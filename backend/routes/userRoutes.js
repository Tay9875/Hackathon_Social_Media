const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllUsers, getMe, getUserByUuid, createUser, updateUser, deleteUser } = require("../controllers/userController");

router
    .get('/', getAllUsers)
    .get('/me', authMiddleware, getMe)
    .get('/:uuid', getUserByUuid)
    .post('/', createUser)
    .put('/:uuid', updateUser)
    .delete('/:uuid', deleteUser)

module.exports = router;