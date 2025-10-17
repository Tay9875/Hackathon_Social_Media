const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel")
const authMiddleware = require("../middleware/authMiddleware");
const Token = require("../models/tokenModel");
const PostError = require("../errors/postError");
const AuthError = require("../errors/authError");

//get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().sort({ createdAt: -1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get a profile's posts
router.get('/profile/:uuid', async (req, res) => {
    try {
        const profile = await User.findOne({ uuid: req.params.uuid });
        const posts = await Post.find({ createdBy: profile._id})
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 }); // à modifier pour augmenter la vitesse de la requête ?

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get a specific post with post.uuid
router.get('/:uuid', async (req, res) => {
    try {
        const post = await Post.findOne({ uuid: req.params.uuid })
            .populate("createdBy", "uuid firstName lastName avatar");
        if (!post) throw PostError.notFound();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { content, images } = req.body;
        const userUuid = req.userUuid;
        if (!userUuid) throw AuthError.sessionInvalid();
        if (!content && !images) throw PostError.missingFields();
        if (content.length > 1500) throw PostError.MessageTooBig();
        if (images.length > 4) throw PostError.TooManyImages();
        const createdByUser = await User.findOne({ uuid: req.userUuid });
        if (!createdByUser) throw UserError.notFound();
        const newPost = await Post.create({ content, images, createdBy: createdByUser._id });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:uuid', authMiddleware, async (req, res) => {
    try {
        const { content, images } = req.body;
        const userUuid = req.userUuid;
        if (!userUuid) throw AuthError.sessionInvalid();
        if (!content && !images) throw PostError.missingFields();
        if (content.length > 1500) throw PostError.MessageTooBig();
        if (images.length > 4) throw PostError.TooManyImages();
        const post = await Post.findOne({ uuid: userUuid });
        if (!post) throw PostError.notFound();
        if (post.createdBy.uuid !== userUuid) throw PostError.unauthorizedEdit();
        post.content = content;
        post.images = images;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete a post
router.delete('/:uuid', authMiddleware, async (req, res) => {
    try {
        const userUuid = req.userUuid;
        if (!userUuid) throw AuthError.sessionInvalid();
        const post = await Post.findOne({ uuid: req.params.uuid }).populate("createdBy", "uuid");
        if (!post) throw PostError.notFound();
        if (!post.createdBy || post.createdBy.uuid !== userUuid) throw PostError.unauthorizedEdit();
        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;