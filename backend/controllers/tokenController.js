const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const TokenError = require("../errors/tokenError");
const UserError = require("../errors/userError");

const getAllTokens = async (req, res) => {
    try {
        const tokens = await Token.find();
        if (!tokens) throw TokenError.notFound();
        res.status(200).json(tokens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const checkToken = async (req, res) => {
    try {
        res.status(200).json({ message: "Token is valid", userUuid: req.userUuid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getTokenByUuid = async (req, res) => {
    try {
        const token = await Token.findOne({ uuid: req.params.uuid });
        if (!token) throw TokenError.notFound();
        res.status(200).json(token);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createToken = async (req, res) => {
    try {
        const { userUuid } = req.body;
        if (!userUuid) throw TokenError.missingFields();
        const user = await User.findOne({ uuid: userUuid });
        if (!user) throw UserError.notFound();
        
        const userAgent = req.headers["user-agent"] || "unknown";
        const ipAddress = req.ip || req.socket.remoteAddress;
        
        const tokenValue = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
        
        await Token.deleteMany({ userUuid: user.uuid });
        
        const newToken = await Token.create({
          tokenName: "auth",
          tokenValue :tokenValue,
          userUuid: user.uuid,
          userAgent: userAgent,
          ipAddress: ipAddress,
          expiresAt: expiresAt,
        });
      
        res.status(201).json({
          message: "Token created successfully",
          token: newToken.tokenValue,
          expiresAt,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteToken = async (req, res) => {
    try {
        const tokenValue = req.headers["authorization"].replace("Bearer ", "");
        if (!tokenValue) throw TokenError.missingFields();
        const token = await Token.findOne({ tokenValue });
        if (!token) throw TokenError.notFound();
        await Token.deleteOne({ tokenValue });
        res.status(200).json({ message: "Token deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllTokens, checkToken, getTokenByUuid, createToken, deleteToken };