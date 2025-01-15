import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("Authentication failed: No token provided");
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      console.log("Authentication failed: Invalid token");
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;

    next();
  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAuthenticated;
