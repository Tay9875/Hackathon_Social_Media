require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Comment = require("../models/commentModel")
const authMiddleware = require("../middleware/authMiddleware");

//get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find().sort({ createdAt: 1});
    res.json(comments);
});

//get a specific comment with comment.uuid
router.get('/:uuid', async (req, res) => {
    const comment = await Comment.findOne({ uuid: req.params.uuid })
        .populate("createdBy", "uuid firstName lastName avatar")
        .populate("profile", "uuid firstName lastName avatar");
    res.status(200).json(comment);
});

//get a profile's comments 
router.get('/profile/:uuid', async (req, res) => {
    try {
        const profile = await User.findOne({ uuid: req.params.uuid });
        const comments = await Comment.find({ profile: profile._id})
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 }); // à modifier pour augmenter la vitesse de la requête
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//create a new comment (à modifier car retourne erreur)
router.post('/', async (req, res) => {
    const { message, createdBy: createdByUuid, profile: profileUuid } = req.body;
    if(!message || !createdByUuid || !profileUuid) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const createdByUser = await User.findOne({ uuid: createdByUuid });
        const profileUser = await User.findOne({ uuid: profileUuid });
        if (!createdByUser || !profileUser) return res.status(404).json({ message: 'User not found' });
        const newComment = await Comment.create({ message, createdBy: createdByUser._id, profile: profileUser._id });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//modify comment
router.put('/:uuid', authMiddleware, async (req, res) => {
    const { message } = req.body;
    const { uuid } = req.params;
    try {
        const updatedComment = await Comment.updateOne({ uuid }, { message });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//delete a comment
router.delete('/:uuid', async (req, res) => {
    try {
        const deletedComment = await Comment.deleteOne({ uuid: req.params.uuid });
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;