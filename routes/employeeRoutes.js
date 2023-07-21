const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.get('/profile', authenticateToken,employeeController.getEmployeeProfile);

router.post('/registerHackathon',authenticateToken,employeeController.registerForHackathon);

router.get('/hackathons/:status', authenticateToken,employeeController.getHackathonsByStatus);

// New route to search hackathons by name, company, and technology stack
router.get('/search', authenticateToken, employeeController.searchHackathons);


// Route to list all participants of a Hackathon
router.get('/participatedHackathons', authenticateToken, employeeController.getParticipatedHackathons);


router.get('/allHackathonsStatus', authenticateToken, employeeController.getAllHackathons);

module.exports = router;