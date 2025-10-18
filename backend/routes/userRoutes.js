const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getMe, getUserByUuid, createUser, updateUser, deleteUser } = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Management of users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       404:
 *         description: Users not found
 *       500:
 *         description: Server error
 */
router.get('/', getAllUsers)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the connected user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Details of the connected user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/me', authMiddleware, getMe)

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Get a user by its UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: Details of the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:uuid', getUserByUuid)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthDate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/', createUser)


/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthDate:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *               password:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: You are not authorized to access this resource
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:uuid', authMiddleware, updateUser)

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: You are not authorized to access this resource
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:uuid', authMiddleware, deleteUser)

module.exports = router;