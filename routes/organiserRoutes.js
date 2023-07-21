const express = require('express');
const router = express.Router();
const organiserController = require('../controllers/organiserController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to create a new hackathon
router.post('/createHackathon', authenticateToken, authorizeOrganizer, organiserController.createHackathon);

// Route to list all participants of a Hackathon
router.get('/participants/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.listParticipants);

// Route to filter participants of a Hackathon by experience level, technology stack, and business unit
router.get('/filterParticipants/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.getParticipantsByHackathon);

// Route to update a Hackathon by its name
router.put('/hackathons/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.updateHackathon);

// Route to delete a Hackathon by its name
router.delete('/hackathons/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.deleteHackathon);

module.exports = router;
