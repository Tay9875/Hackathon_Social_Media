const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");

router
    .post('/signup', authController)
    .post('/login', loginController)

module.exports = router;