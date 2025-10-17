const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getMe, getUserByUuid, createUser, updateUser, deleteUser } = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', getAllUsers)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Récupère l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur connecté
 *       401:
 *         description: Non authentifié
 */
router.get('/me', authMiddleware, getMe)

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Récupère un utilisateur par son UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:uuid', getUserByUuid)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
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
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Champs requis manquants
 */
router.post('/', createUser)


/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Met à jour un utilisateur
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
 *         description: Utilisateur mis à jour
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:uuid', authMiddleware, updateUser)

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Supprime un utilisateur
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
 *         description: Utilisateur supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:uuid', authMiddleware, deleteUser)

module.exports = router;