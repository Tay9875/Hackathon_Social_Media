const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllTokens, checkToken, getTokenByUuid, createToken, deleteToken } = require("../controllers/tokenController");

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: Management of tokens of authentication
 */

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get all tokens
 *     tags: [Tokens]
 *     responses:
 *       200:
 *         description: List of existing tokens
 *       404:
 *         description: Tokens not found
 *       500:
 *         description: Server error
 */
router.get('/', getAllTokens)

/**
 * @swagger
 * /tokens/check:
 *   get:
 *     summary: Vérifie la validité du token actuel
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token invalid or expired
 *       401:
 *         description: Session invalid — please re-login
 *       500:
 *         description: Server error
 */
router.get("/check", authMiddleware, checkToken)

/**
 * @swagger
 * /tokens/{uuid}:
 *   get:
 *     summary: Get a token by its UUID
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the token
 *     responses:
 *       200:
 *         description: Token found
 *       404:
 *         description: Token not found
 *       500:
 *         description: Server error
 */
router.get('/:uuid', getTokenByUuid)

/**
 * @swagger
 * /tokens:
 *   post:
 *     summary: Create a token for a user
 *     tags: [Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userUuid
 *             properties:
 *               userUuid:
 *                 type: string
 *                 description: UUID of the user
 *     responses:
 *       201:
 *         description: Token created successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/", createToken)

/**
 * @swagger
 * /tokens:
 *   delete:
 *     summary: Delete the current token
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token deleted successfully
 *       401:
 *         description: Token invalid or expired
 *       401:
 *         description: Session invalid — please re-login
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Token not found
 *       500:
 *         description: Server error
 */
router.delete("/", authMiddleware, deleteToken);

module.exports = router;