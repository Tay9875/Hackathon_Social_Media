const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

const LoginError = require("../errors/loginError");
const UserError = require("../errors/userError");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw LoginError.existingEmailAndPassword();
    
        const user = await User.findOne({ email });
        if (!user) throw UserError.notFound();
    
        if (password !== user.password) throw LoginError.incorrectPassword();
    
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