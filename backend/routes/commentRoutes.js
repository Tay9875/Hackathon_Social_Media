const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllComments, getCommentByUuid, getCommentsByProfileUuid, getCommentsByPostUuid, createCommentOnProfile, createCommentOnPost, updateComment, deleteComment } = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Management of comments on profiles and posts
 */

/**
 * @swagger
 * /comments/profile/{uuid}:
 *   get:
 *     summary: Get comments associated with a user profile
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user profile
 *     responses:
 *       201:
 *         description: List of comments associated with the user profile
 *       404:
 *         description: User profile not found
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Server error
 */
router.get('/profile/:uuid', getCommentsByProfileUuid)

/**
 * @swagger
 * /comments/post/{uuid}:
 *   get:
 *     summary: Get comments associated with a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the post
 *     responses:
 *       200:
 *         description: List of comments associated with the post
 *       404:
 *         description: Post not found
 *       404:   
 *         description: Comments not found
 *       500:
 *         description: Server error
 */
router.get('/post/:uuid', getCommentsByPostUuid)

/**
 * @swagger
 * /comments/{uuid}:
 *   get:
 *     summary: Get a comment by UUID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the comment
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:uuid', getCommentByUuid)

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *       500:
 *         description: Server error
 */
router.get('/', getAllComments)

/**
 * @swagger
 * /comments/profile/{uuid}:
 *   post:
 *     summary: Create a comment on a user profile
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: Target user profile UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: Comment content (max 1000 characters)
 *     responses:
 *       201:
 *         description: Comment created successfully, the comment is added to the database
 *       400:
 *         description: Message is too long, the maximum length is 1000 characters
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Session invalid — please re-login
 *       404:
 *         description: User not found
 *       404:
 *         description : User profile not found
 *       500:
 *         description: Server error
 */
router.post('/profile/:uuid', authMiddleware, createCommentOnProfile)

/**
 * @swagger
 * /comments/post/{uuid}:
 *   post:
 *     summary: Add a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the post
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Message is too long, the maximum length is 1000 characters
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Session invalid — please re-login
 *       404:
 *         description: User not found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.post('/post/:uuid', authMiddleware, createCommentOnPost)

/**
 * @swagger
 * /comments/{uuid}:
 *   put:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Nouveau texte du commentaire
 *     responses:
 *       201:
 *         description: Comment updated successfully
 *       400:
 *         description: Message is too long, the maximum length is 1000 characters
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: You cannot edit someone else's comment
 *       404:
 *         description: Comment not found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:uuid', authMiddleware, updateComment)

/**
 * @swagger
 * /comments/{uuid}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: You cannot delete someone else's comment
 *       404:
 *         description: Comment not found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:uuid', authMiddleware, deleteComment)

module.exports = router;