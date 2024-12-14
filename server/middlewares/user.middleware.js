import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authUser = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    
    req.userId = user.id;  
    req.user = user;       
    next();               
  });
};

export const authAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; 
    // console.log("userId: " + userId); 

    if (!userId) {
      return res.status(403).json({ message: "User ID not found" });
    }

    const user = await User.findById(userId);
    // console.log(user);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Permission denied: Admin role required",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied" });
  }
};
