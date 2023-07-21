const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.get('/profile', authenticateToken, employeeController.getEmployeeProfile);

// Route to register for a hackathon
router.post('/registerHackathon', authenticateToken, employeeController.registerForHackathon);

// Route to get hackathons based on status (upcoming, active, past)
router.get('/hackathons/:status', authenticateToken, employeeController.getHackathonsByStatus);

// New route to search hackathons by name, company, and technology stack
router.get('/search', authenticateToken, employeeController.searchHackathons);

// Route to list all hackathons participated by the employee
router.get('/participatedHackathons', authenticateToken, employeeController.getParticipatedHackathons);

// Route to get all hackathons and their statuses
router.get('/allHackathonsStatus', authenticateToken, employeeController.getAllHackathons);

module.exports = router;
