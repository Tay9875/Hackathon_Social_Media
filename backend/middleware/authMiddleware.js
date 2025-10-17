const Token = require("../models/tokenModel");
const AuthError = require("../errors/authError");
const TokenError = require("../errors/tokenError");

const authMiddleware = async (req, res, next) => {
  try {
    const tokenValue = req.cookies?.authToken || (req.headers["authorization"]?.replace("Bearer ", "") ?? null);
    
    if (!tokenValue) throw AuthError.missingToken();

    const token = await Token.findOne({ tokenValue });
    if (!token) throw TokenError.notFound();
    if (token.expiresAt < new Date()) throw TokenError.expired();

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;

    if (token.userAgent !== userAgent || token.ipAddress !== ipAddress) throw AuthError.sessionInvalid();

    req.userUuid = token.userUuid;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authMiddleware;