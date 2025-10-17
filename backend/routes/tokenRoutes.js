const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllTokens, checkToken, getTokenByUuid, createToken, deleteToken } = require("../controllers/tokenController");

router
    .get('/', getAllTokens)
    .get("/check", authMiddleware, checkToken)
    .get('/:uuid', getTokenByUuid)
    .post("/", createToken)
    .delete("/", authMiddleware, deleteToken);

module.exports = router;