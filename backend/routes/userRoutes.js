const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getMe, getUserByUuid, createUser, updateUser, deleteUser } = require("../controllers/userController");

router
    .get('/', getAllUsers)
    .get('/me', authMiddleware, getMe)
    .get('/:uuid', getUserByUuid)
    .post('/', createUser)
    .put('/:uuid', authMiddleware, updateUser)
    .delete('/:uuid', authMiddleware, deleteUser)

module.exports = router;