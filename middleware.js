import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("url " + req.url);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Proceed to the next middleware or route if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/user", "/"], // Adjust based on your protected routes
};
