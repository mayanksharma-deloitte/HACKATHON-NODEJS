const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.get('/profile', authenticateToken,employeeController.getEmployeeProfile);

router.post('/register',authenticateToken,employeeController.registerForHackathon);


module.exports = router;