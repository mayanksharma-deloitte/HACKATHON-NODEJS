const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Import the authenticateToken middleware
const { authenticateToken } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.get('/profile', authenticateToken, employeeController.getEmployeeProfile);

module.exports = router;