const express = require("express");
const router = express.Router();
const authController = require("./../controller/auth-controller");
const authService = require('./../services/auth-service');

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authService, authController.me);

module.exports = router;
