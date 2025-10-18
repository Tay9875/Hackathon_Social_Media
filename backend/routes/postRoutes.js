const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllPosts, getProfilePosts, getPostByUuid, createPost, updatePost, deletePost } = require("../controllers/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Management of posts of users
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *       404:
 *         description: Posts not found
 *       500:
 *         description: Server error
 */
router.get('/', getAllPosts)

/**
 * @swagger
 * /posts/profile/{uuid}:
 *   get:
 *     summary: Get posts of a specific user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user profile
 *     responses:
 *       200:
 *         description: List of posts of the user
 *       404:
 *         description: User not found
 *       404:
 *         description: Posts not found
 *       500:
 *         description: Server error
 */
router.get('/profile/:uuid', getProfilePosts)

/**
 * @swagger
 * /posts/{uuid}:
 *   get:
 *     summary: Get a post by its UUID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the post
 *     responses:
 *       200:
 *         description: Details of the post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:uuid', getPostByUuid)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Text of the post
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of URLs of images (max 4)
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Missing required fields 
 *       400:
 *         description: Message is too big, the maximum length is 1500 characters
 *       400:
 *         description: You can only upload 4 image
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: You cannot edit someone else's post
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, createPost)

/**
 * @swagger
 * /posts/{uuid}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New text of the post
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: New images associated
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Missing required fields
 *       400:
 *         description: Message is too big, the maximum length is 1500 characters
 *       400:
 *         description: You can only upload 4 image
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: You cannot edit someone else's post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put('/:uuid', authMiddleware, updatePost)

/**
 * @swagger
 * /posts/{uuid}:
 *   delete:
 *     summary: Delete an existing post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: You cannot delete someone else's post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete('/:uuid', authMiddleware, deletePost)

module.exports = router;