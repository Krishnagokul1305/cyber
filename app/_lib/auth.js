import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded; // Assign decoded token to `req.user`
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};
