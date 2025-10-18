const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const AuthError = require("../errors/authError");
const CommentError = require("../errors/commentError");
const UserError = require("../errors/userError");
const PostError = require("../errors/postError");
const Token = require("../models/tokenModel");

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: 1});
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCommentByUuid = async (req, res) => {
    try {
        const comment = await Comment.findOne({ uuid: req.params.uuid })
            .populate("createdBy", "uuid firstName lastName avatar")
            .populate("targetId", "uuid firstName lastName avatar");
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCommentsByProfileUuid = async (req, res) => {
    try {
        const profile = await User.findOne({ uuid: req.params.uuid });
        const comments = await Comment.find({ targetId: profile._id })
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 });
        
        let currentUserUuid = null;
        const tokenValue = req.cookies?.authToken || req.headers["authorization"]?.replace("Bearer ", "");
        if (tokenValue) {
            const token = await Token.findOne({ tokenValue });
            if (token && token.expiresAt > new Date()) currentUserUuid = token.userUuid;
        }
        
        const commentsWithFlag = comments.map(comment => ({
            ...comment.toObject(),
            userIsAuthor: currentUserUuid ? comment.createdBy?.uuid === currentUserUuid : false
        }));
        res.status(200).json(commentsWithFlag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCommentsByPostUuid = async (req, res) => {
    try {
        const post = await Post.findOne({ uuid: req.params.uuid });
        const comments = await Comment.find({ targetId: post._id })
            .populate("createdBy", "uuid firstName lastName avatar")
            .sort({ createdAt: -1 });

        let currentUserUuid = null;
        const tokenValue = req.cookies?.authToken || req.headers["authorization"]?.replace("Bearer ", "");
        if (tokenValue) {
            const token = await Token.findOne({ tokenValue });
            if (token && token.expiresAt > new Date()) currentUserUuid = token.userUuid;
        }
        
        const commentsWithFlag = comments.map(comment => ({
            ...comment.toObject(),
            userIsAuthor: currentUserUuid ? comment.createdBy?.uuid === currentUserUuid : false
        }));
        res.status(200).json(commentsWithFlag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createCommentOnProfile = async (req, res) => {
    try {
        const { message } = req.body;
        if(message.length > 1000) throw CommentError.MessageTooBig();
        if(!req.userUuid) throw AuthError.invalidSession();
        const authenticatedUser = await User.findOne({ uuid: req.userUuid });
        if(!authenticatedUser) throw UserError.notFound();
        if(!message) throw CommentError.missingFields();
        const profile = await User.findOne({ uuid: req.params.uuid });
        if(!profile) throw UserError.notFound();
        let newComment = await Comment.create({ message, createdBy: authenticatedUser._id, targetId: profile._id, targetModel: "User" });
    newComment = await Comment.findById(newComment._id).populate("createdBy", "uuid firstName lastName avatar");
    
    const userIsAuthor = req.userUuid && newComment.createdBy && newComment.createdBy.uuid === req.userUuid;
    const commentObj = newComment.toObject();
    commentObj.userIsAuthor = userIsAuthor;
    res.status(201).json(commentObj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createCommentOnPost = async (req, res) => {
    try {
        const { message } = req.body;
        if (message.length > 1000) throw CommentError.MessageTooBig();
        if(!message) throw CommentError.missingFields();
        const authenticatedUser = await User.findOne({ uuid: req.userUuid });
        if(!authenticatedUser) throw UserError.notFound();
        const post = await Post.findOne({ uuid: req.params.uuid });
        if (!post) throw PostError.notFound();
        let newComment = await Comment.create({ message, createdBy: authenticatedUser._id, targetId: post._id, targetModel: "Post" });
    newComment = await Comment.findById(newComment._id).populate("createdBy", "uuid firstName lastName avatar");
    
    const userIsAuthor = req.userUuid && newComment.createdBy && newComment.createdBy.uuid === req.userUuid;
    const commentObj = newComment.toObject();
    commentObj.userIsAuthor = userIsAuthor;
    res.status(201).json(commentObj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const { message } = req.body;
        const { uuid } = req.params;
        if (!message) throw CommentError.missingFields();
        if (message.length > 1000) throw CommentError.MessageTooBig();
        const comment = await Comment.findOne({ uuid });
        if (!comment) throw CommentError.notFound();
        const user = await User.findOne({ uuid: req.userUuid });
        const ObjectUserOfComment = await User.findOne({ _id: comment.createdBy }).populate("uuid lastName firstName");
        if (ObjectUserOfComment.uuid !== user.uuid) throw CommentError.unauthorizedEdit();
        comment.message = message;
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { uuid } = req.params;
        const comment = await Comment.findOne({ uuid });
        if (!comment) throw CommentError.notFound();
        const user = await User.findOne({ uuid: req.userUuid });
        const ObjectUserOfComment = await User.findOne({ _id: comment.createdBy }).populate("uuid lastName firstName");
        if (ObjectUserOfComment.uuid !== user.uuid) throw CommentError.unauthorizedDelete();
        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllComments, getCommentByUuid, getCommentsByProfileUuid, getCommentsByPostUuid, createCommentOnProfile, createCommentOnPost, updateComment, deleteComment };