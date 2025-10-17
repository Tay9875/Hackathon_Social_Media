const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllPosts, getProfilePosts, getPostByUuid, createPost, updatePost, deletePost } = require("../controllers/postController");


router
    .get('/', getAllPosts)
    .get('/profile/:uuid', getProfilePosts)
    .get('/:uuid', getPostByUuid)
    .post('/', authMiddleware, createPost)
    .put('/:uuid', authMiddleware, updatePost)
    .delete('/:uuid', authMiddleware, deletePost)

module.exports = router;