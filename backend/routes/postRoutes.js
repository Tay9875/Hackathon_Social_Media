const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllPosts, getProfilePosts, getPostByUuid, createPost, updatePost, deletePost } = require("../controllers/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des publications des utilisateurs
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupère toutes les publications
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Liste de toutes les publications
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getAllPosts)

/**
 * @swagger
 * /posts/profile/{uuid}:
 *   get:
 *     summary: Récupère les publications d’un utilisateur spécifique
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du profil utilisateur
 *     responses:
 *       200:
 *         description: Liste des publications de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/profile/:uuid', getProfilePosts)

/**
 * @swagger
 * /posts/{uuid}:
 *   get:
 *     summary: Récupère une publication par son UUID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du post
 *     responses:
 *       200:
 *         description: Détails du post trouvé
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:uuid', getPostByUuid)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crée une nouvelle publication
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
 *                 description: Texte du post
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste d'URL d'images (max 4)
 *     responses:
 *       201:
 *         description: Post créé avec succès
 *       400:
 *         description: Champs manquants ou invalides
 *       401:
 *         description: Session invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authMiddleware, createPost)

/**
 * @swagger
 * /posts/{uuid}:
 *   put:
 *     summary: Met à jour une publication existante
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nouveau texte du post
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Nouvelles images associées
 *     responses:
 *       200:
 *         description: Post mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:uuid', authMiddleware, updatePost)

/**
 * @swagger
 * /posts/{uuid}:
 *   delete:
 *     summary: Supprime une publication existante
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du post à supprimer
 *     responses:
 *       200:
 *         description: Post supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:uuid', authMiddleware, deletePost)

module.exports = router;