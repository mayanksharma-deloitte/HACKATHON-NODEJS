const organiserService = require('../services/organiserService.js');

exports.createHackathon = async (req, res) => {
    try {
        const newHackathon = await organiserService.createHackathon(req.body, req.user);
        res.status(201).json(newHackathon);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the hackathon.' });
    }
};

exports.listParticipants = async (req, res) => {
    const { hackathonName } = req.params;

    try {
        const participants = await organiserService.listParticipants(hackathonName, req.user);
        res.json(participants);
    } catch (error) {
        console.error('Error listing participants:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getParticipantsByHackathon = async (req, res) => {
    const { hackathonName } = req.params;
    const { experienceLevel, technologyStack, businessUnit } = req.query;

    try {
        const participants = await organiserService.getParticipantsByHackathon(hackathonName, {
            experienceLevel,
            technologyStack,
            businessUnit,
        });
        res.json(participants);
    } catch (error) {
        console.error('Error getting participants:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateHackathon = async (req, res) => {
    const { hackathonName } = req.params;
    const updates = req.body;

    try {
        await organiserService.updateHackathon(hackathonName, updates);
        res.json({ message: 'Hackathon updated successfully' });
    } catch (error) {
        console.error('Error updating Hackathon:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteHackathon = async (req, res) => {
    const { hackathonName } = req.params;

    try {
        await organiserService.deleteHackathon(hackathonName);
        res.json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
        console.error('Error deleting Hackathon:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
