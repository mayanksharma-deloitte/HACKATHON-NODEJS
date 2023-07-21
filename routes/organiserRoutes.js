const express = require('express');
const router = express.Router();
const organiserController = require('../controllers/organiserController.js');

// Import the authenticateToken middleware
const { authenticateToken, authorizeOrganizer } = require('../utils/authMiddleware.js');

// Route to get the profile information of the authenticated employee
router.post('/createHackathon', authenticateToken,authorizeOrganizer,organiserController.createHackathon);

// Route to list all participants of a Hackathon
router.get('/participants/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.listParticipants);


router.get('/filterParticipants/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.getParticipantsByHackathon);

// In organizerRoutes.js
router.put('/hackathons/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.updateHackathon);
router.delete('/hackathons/:hackathonName', authenticateToken, authorizeOrganizer, organiserController.deleteHackathon);



module.exports = router;