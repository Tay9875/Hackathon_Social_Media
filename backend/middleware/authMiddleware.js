const Token = require("../models/tokenModel");

const authMiddleware = async (req, res, next) => {
  try {
    const tokenValue = req.cookies?.authToken || (req.headers["authorization"]?.replace("Bearer ", "") ?? null);

    if (!tokenValue) return res.status(401).json({ message: "No token provided" });

    const token = await Token.findOne({ tokenValue });
    if (!token) return res.status(401).json({ message: "Invalid token" });
    if (token.expiresAt < new Date()) return res.status(401).json({ message: "Token expired" });

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;

    if (token.userAgent !== userAgent || token.ipAddress !== ipAddress) return res.status(401).json({ message: "Session invalid — please re-login" });

    req.userUuid = token.userUuid;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authMiddleware;