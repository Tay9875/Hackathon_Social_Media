require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const { v4: uuidv4 } = require("uuid");

//get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find().sort({ createdAt: 1});
    res.json(comments);
});

//get a specific comment with comment.uuid
router.get('/:uuid', async (req, res) => {
    const comment = await Comment.findOne({ uuid: req.params.uuid });
    res.json(comment);
});

//get a profile's comments 
router.get('/profile/:uuid', async (req, res) => {
    const comments = await Comment.find({ createdBy: req.params.uuid}).sort({ createdAt: 1});
    res.json(comments);
});

//create a new comment (à modifier car retourne erreur)
router.post('/', async (req, res) => {
    const { message, createdBy} = req.body;
    if(!message || !createdBy ) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newComment = await Comment.create({ uuid: uuidv4(), message, createdBy});
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//modify comment
router.put('/:uuid', async (req, res) => {
    const { message, createdBy} = req.body;
    const { uuid } = req.params;
    try {
        const updatedComment = await Comment.updateOne({ uuid }, { message, createdBy});
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