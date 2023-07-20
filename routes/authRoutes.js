
const express = require('express');
const router = express.Router();
const { registerEmployee, loginEmployee } = require('../controllers/authController.js');

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);

module.exports = router;
