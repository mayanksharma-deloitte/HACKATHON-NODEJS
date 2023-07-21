const EmployeeService = require('../services/employeeService.js');

exports.getEmployeeProfile = async (req, res) => {
    try {
        const employeeId = req.user;
        const employee = await EmployeeService.getEmployeeProfile(employeeId);
        res.json(employee);
    } catch (error) {
        console.error('Error getting employee profile:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.registerForHackathon = async (req, res) => {
    const { hackathonName, employeeUsername } = req.body;

    try {
        const message = await EmployeeService.registerForHackathon(hackathonName, employeeUsername);
        res.json({ message });
    } catch (error) {
        console.error('Error registering for hackathon:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getParticipatedHackathons = async (req, res) => {
    try {
        const employeeId = req.user;
        const participatedHackathons = await EmployeeService.getParticipatedHackathons(employeeId);
        res.json(participatedHackathons);
    } catch (error) {
        console.error('Error getting participated hackathons:', error.message);
        res.status(500).json({ error: error.message });
    }
};



exports.getHackathonsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const hackathons = await EmployeeService.getHackathonsByStatus(status, page, limit);
        res.json(hackathons);
    } catch (error) {
        console.error('Error getting hackathons by status:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.searchHackathons = async (req, res) => {
    try {
        const { name, company, technologyStack } = req.query;

        const hackathons = await EmployeeService.searchHackathons(name, company, technologyStack);
        res.json(hackathons);
    } catch (error) {
        console.error('Error searching hackathons:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllHackathons = async (req, res) => {
    try {
        const hackathons = await EmployeeService.getAllHackathons();
        res.json(hackathons);
    } catch (error) {
        console.error('Error getting hackathons:', error.message);
        res.status(500).json({ error: error.message });
    }
};
