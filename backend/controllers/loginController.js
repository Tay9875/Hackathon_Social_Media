const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ message: "Email and password are required" });
    
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        const hashToVerify = crypto
          .pbkdf2Sync(password, user.passwordSalt, 100000, 64, "sha512")
          .toString("hex");
    
        if (hashToVerify !== user.passwordHash) return res.status(401).json({ message: "Password incorrect" });
    
        const userAgent = req.headers["user-agent"] || "unknown";
        const ipAddress = req.ip || req.socket.remoteAddress;
        const tokenValue = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

        await Token.deleteMany({ userUuid: user.uuid });
        await Token.create({ tokenValue, userUuid: user.uuid, userAgent, ipAddress, expiresAt, tokenName: "auth" });

        res.status(200).json({ message: "Login successful", token: tokenValue, expiresAt, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = login;