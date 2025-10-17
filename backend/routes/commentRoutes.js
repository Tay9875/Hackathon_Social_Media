const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllComments, getCommentByUuid, getCommentsByProfileUuid, getCommentsByPostUuid, createCommentOnProfile, createCommentOnPost, updateComment, deleteComment } = require("../controllers/commentController");

router
    .get('/profile/:uuid', getCommentsByProfileUuid)
    .get('/post/:uuid', getCommentsByPostUuid)
    .get('/:uuid', getCommentByUuid)
    .get('/', getAllComments)
    .post('/profile/:uuid', authMiddleware, createCommentOnProfile)
    .post('/post/:uuid', authMiddleware, createCommentOnPost)
    .put('/:uuid', authMiddleware, updateComment)
    .delete('/:uuid', authMiddleware, deleteComment)

module.exports = router;