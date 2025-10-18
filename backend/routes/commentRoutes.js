const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllComments, getCommentByUuid, getCommentsByProfileUuid, getCommentsByPostUuid, createCommentOnProfile, createCommentOnPost, updateComment, deleteComment } = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion des commentaires sur profils et publications
 */

/**
 * @swagger
 * /comments/profile/{uuid}:
 *   get:
 *     summary: Récupère les commentaires associés à un profil utilisateur
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du profil
 *     responses:
 *       200:
 *         description: Liste des commentaires du profil
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/profile/:uuid', getCommentsByProfileUuid)

/**
 * @swagger
 * /comments/post/{uuid}:
 *   get:
 *     summary: Récupère les commentaires associés à une publication
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du post
 *     responses:
 *       200:
 *         description: Liste des commentaires du post
 *       404:
 *         description: Post non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/post/:uuid', getCommentsByPostUuid)

/**
 * @swagger
 * /comments/{uuid}:
 *   get:
 *     summary: Récupère un commentaire par UUID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire trouvé
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:uuid', getCommentByUuid)

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupère tous les commentaires
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Liste de tous les commentaires
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getAllComments)

/**
 * @swagger
 * /comments/profile/{uuid}:
 *   post:
 *     summary: Crée un commentaire sur un profil utilisateur
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du profil cible
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
 *                 description: Contenu du commentaire (max 1000 caractères)
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Champs manquants
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
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
 *         description: UUID du post
 *     responses:
 *       200:
 *         description: Comment added successfully
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
 *     summary: Met à jour un commentaire existant
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID du commentaire à modifier
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
 *       200:
 *         description: Commentaire mis à jour
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:uuid', authMiddleware, updateComment)

/**
 * @swagger
 * /comments/{uuid}:
 *   delete:
 *     summary: Supprime un commentaire existant
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
 *         description: Commentaire supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:uuid', authMiddleware, deleteComment)

module.exports = router;