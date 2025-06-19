import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log the Authorization header for debugging
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or invalid format");
    return res.status(401).json({ message: "Unauthorized: No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.log("User not found for decoded token ID");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};