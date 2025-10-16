require("dotenv").config();
const express = require("express");
const router = express.Router();
const Token = require("../models/tokenModel");
const User = require("../models/userModel");

router.get('/', async (req, res) => {
    const tokens = await Token.find();
    res.status(200).json(tokens);
});

router.get('/:uuid', async (req, res) => {
    const token = await Token.findOne({ uuid: req.params.uuid });
    res.status(200).json(token);
});

router.post("/", async (req, res) => {
    const { userUuid } = req.body;
    if (!userUuid) return res.status(400).json({ message: "Missing userUuid" });
  
    try {
        const user = await User.findOne({ uuid: userUuid });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const userAgent = req.headers["user-agent"] || "unknown";
        const ipAddress = req.ip || req.socket.remoteAddress;
        
        const tokenValue = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
        
        await Token.deleteMany({ userUuid: user.uuid });
        
        const newToken = await Token.create({
          tokenValue,
          userUuid: user.uuid,
          userAgent,
          ipAddress,
          expiresAt,
        });
      
        res.status(201).json({
          message: "Token created successfully",
          token: newToken.tokenValue,
          expiresAt,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});  

router.delete("/", authMiddleware, async (req, res) => {
    try {
      const tokenValue = req.headers["authorization"].replace("Bearer ", "");
      await Token.deleteOne({ tokenValue });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.get("/check", authMiddleware, async (req, res) => {
  res.status(200).json({ message: "Token is valid", userUuid: req.userUuid });
});
module.exports = router;