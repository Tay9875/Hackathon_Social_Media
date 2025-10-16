require("dotenv").config();
const express = require("express");
const router = express.Router();
const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

router.get('/', async (req, res) => {
    const tokens = await Token.find();
    res.status(200).json(tokens);
});

router.get('/:uuid', async (req, res) => {
    const token = await Token.findOne({ uuid: req.params.uuid });
    res.status(200).json(token);
});

router.get('/:tokenValue', async (req, res) => {
    const token = await Token.findOne({ tokenValue: req.params.tokenValue });
    if(!token) return res.status(404).json({ message: "Token non trouvé" });
    if(token.expiresAt < Date.now()) return res.status(400).json({ message: "Token expiré" });
    res.status(200).json(token);
});
module.exports = router;