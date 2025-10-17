const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllTokens, checkToken, getTokenByUuid, createToken, deleteToken } = require("../controllers/tokenController");

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: Gestion des tokens d'authentification
 */

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Récupère tous les tokens
 *     tags: [Tokens]
 *     responses:
 *       200:
 *         description: Liste des tokens existants
 *       500:
 *         description: Erreur serveur
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
 *         description: Token valide
 *       401:
 *         description: Token invalide ou expiré
 */
router.get("/check", authMiddleware, checkToken)

/**
 * @swagger
 * /tokens/{uuid}:
 *   get:
 *     summary: Récupère un token par son UUID
 *     tags: [Tokens]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du token
 *     responses:
 *       200:
 *         description: Token trouvé
 *       404:
 *         description: Token non trouvé
 */
router.get('/:uuid', getTokenByUuid)

/**
 * @swagger
 * /tokens:
 *   post:
 *     summary: Crée un token pour un utilisateur
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
 *                 description: UUID de l'utilisateur
 *     responses:
 *       201:
 *         description: Token créé avec succès
 *       400:
 *         description: Champs manquants
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post("/", createToken)

/**
 * @swagger
 * /tokens:
 *   delete:
 *     summary: Supprime le token actuel
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token supprimé avec succès
 *       401:
 *         description: Token invalide ou expiré
 */
router.delete("/", authMiddleware, deleteToken);

module.exports = router;