const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
