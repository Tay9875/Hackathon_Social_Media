const User = require("../models/userModel");
const Post = require("../models/postModel");
const PostError = require("../errors/postError");
const UserError = require("../errors/userError");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProfilePosts = async (req, res) => {
    try {
        const profile = await User.findOne({ uuid: req.params.uuid });
        const posts = await Post.find({ createdBy: profile._id})
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 }); // à modifier pour augmenter la vitesse de la requête ?

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPostByUuid = async (req, res) => {
    try {
        const post = await Post.findOne({ uuid: req.params.uuid })
            .populate("createdBy", "uuid firstName lastName avatar");
        if (!post) throw PostError.notFound();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createPost = async (req, res) => {
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
}

const updatePost = async (req, res) => {
    try {
        const { content, images } = req.body;
        const userUuid = req.userUuid;
        if (!userUuid) throw AuthError.sessionInvalid();
        if (!content && !images) throw PostError.missingFields();
        if (content.length > 1500) throw PostError.MessageTooBig();
        if (images.length > 4) throw PostError.TooManyImages();
        const post = await Post.findOne({ uuid: req.params.uuid });
        if (!post) throw PostError.notFound();
        const createdByUser = await User.findOne({ _id: post.createdBy }).populate("uuid lastName firstName");
        if (createdByUser.uuid !== userUuid) throw PostError.unauthorizedEdit();
        post.content = content;
        post.images = images;
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
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
}

module.exports = { getAllPosts, getProfilePosts, getPostByUuid, createPost, updatePost, deletePost };