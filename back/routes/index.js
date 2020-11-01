const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require("../controllers/users")
const walletController = require("../controllers/wallet");
const movementController = require("../controllers/movement");

router.post("/login", passport.authenticate("local"), userController.login)

router.post("/register", userController.register)

router.get("/users", userController.findAll)

router.get("/logout", userController.logout);

router.get("/check", userController.check);

router.put("/charge", walletController.charge)

router.post("/value", walletController.value)

router.put("/pay", walletController.pay)

router.post("/code", walletController.sendCode)

router.post("/movements", movementController.find)

module.exports = router