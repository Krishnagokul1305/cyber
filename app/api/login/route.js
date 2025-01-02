import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../_lib/prisma";
import twilio from "twilio";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";

if (!TWILIO_SID || !TWILIO_AUTH_TOKEN) {
  throw new Error("Twilio credentials are not configured properly");
}

const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const containsSQLInjectionPatterns = (str) => {
  const sqlInjectionPattern = /(\b(OR|SELECT|INSERT|DROP|--|;|')\b)/i;
  return sqlInjectionPattern.test(str);
};

export async function POST(req) {
  try {
    const { userName, password } = await req.json();

    if (!userName || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (containsSQLInjectionPatterns(userName)) {
      await client.messages.create({
        body: `Possible SQL injection detected: ${userName}`,
        from: "+12184754172",
        to: "+919345577429",
      });

      await prisma.attack.create({
        data: {
          attackType: "SQL Injection",
          ipAddress: req.headers.get("x-forwarded-for") || "unknown",
          timestamp: new Date(),
        },
      });

      return NextResponse.json(
        { error: "Potential SQL injection attempt detected" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { userName },
    });

    console.log("User exists:", userExists);

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: userExists.id, userName: userExists.userName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";
    await prisma.activity.create({
      data: {
        loginTime: new Date(),
        ipAddress,
        type: "login",
        userName,
      },
    });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });
    response.cookies.set("userData", JSON.stringify(userExists), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error.message, error.stack);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
