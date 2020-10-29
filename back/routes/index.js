const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require("../controllers/users")

router.post("/login", passport.authenticate("local"), userController.login)

router.post("/register", userController.register)

router.get("/users", userController.findAll)

router.get("/logout", userController.logout);

router.get("/check", userController.check);

module.exports = router