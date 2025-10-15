const bcrypt = require("bcrypt");
const JsonWebToken = require("../functions/JsonWebToken");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = await JsonWebToken.verifyToken(token);
    if(!decoded) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
}