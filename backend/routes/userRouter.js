const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get('/verify', userController.verifyToken);
router.get('/refresh', userController.refresh);

module.exports = router;