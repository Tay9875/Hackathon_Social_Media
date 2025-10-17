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
 *     summary: Inscrit un nouvel utilisateur
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
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Champs manquants ou e-mail existant
 *       500:
 *         description: Erreur serveur
 */
router.post('/signup', authController)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur existant
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
 *         description: Connexion réussie, retourne le token
 *       401:
 *         description: Identifiants incorrects
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', loginController)

module.exports = router;