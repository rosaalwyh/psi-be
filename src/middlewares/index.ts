import { Request, Response, NextFunction } from "express";
import JwtService from "../helpers/jwtService";
declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = JwtService.verify(token);
    req.username = decoded.username;

    res.setHeader("username", decoded.username);

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
