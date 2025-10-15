require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const { v4: uuidv4 } = require("uuid");

router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

router.get('/:uuid', async (req, res) => {
    const comment = await Comment.findOne({ uuid: req.params.uuid });
    res.json(comment);
});

router.get('/profile/:uuid', async (req, res) => {
    const profile = await User.findOne({ uuid: req.params.uuid });
    const comments = await Comment.find({ profile: profile});
    res.json(comments);
});

router.post('/', async (req, res) => {
    const { message, createdBy, profile } = req.body;
    if(!message || !createdBy || !profile) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newComment = await Comment.create({ uuid: uuidv4(), message, createdBy, profile });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;