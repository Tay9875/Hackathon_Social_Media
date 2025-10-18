const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification (inscription / connexion)
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *         description: User created successfully, created the token and add the user information to the database
 *       400:
 *         description: Email already used
 *       401:
 *         description: Invalid email format, the email must be in the format example@example.com
 *       401:
 *         description: No token provided
 *       401:
 *         description: Invalid or expired token
 *       401:
 *         description: Session invalid — please re-login
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
router.post('/signup', authController)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connect a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Login successful, retourn the token the token, the token expires at and the user information
 *       400: 
 *         description: Email and password are required
 *       401:
 *         description: Password incorrect
 *       404:
 *         description: Email incorrect
 *       500:
 *         description: Server error
 */
router.post('/login', loginController)

module.exports = router;