const express = require('express');
const router = express.Router();
const organiserController = require('../controllers/organiserController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.post('/createHackathon', authenticateToken,authorizeOrganizer,organiserController.createHackathon);

module.exports = router;