require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

router.get('/:uuid', async (req, res) => {
    const comment = await Comment.findOne({ uuid: req.params.uuid })
        .populate("createdBy", "uuid firstName lastName avatar")
        .populate("profile", "uuid firstName lastName avatar");
    res.status(200).json(comment);
});

router.get('/profile/:uuid', async (req, res) => {
    try {
        const profile = await User.findOne({ uuid: req.params.uuid });
        const comments = await Comment.find({ profile: profile.uuid})
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 }); // à modifier pour augmenter la vitesse de la requête
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { message, createdBy, profile } = req.body;
    if(!message || !createdBy || !profile) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const createdBy = await User.findOne({ uuid: createdBy });
        const profile = await User.findOne({ uuid: profile });
        const newComment = await Comment.create({ uuid: uuidv4(), message, createdBy, profile });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;