const authService = require('../services/authService.js');

exports.registerEmployee = async (req, res) => {
    const { username, email, password, experienceLevel, technologyStack, businessUnit } = req.body;

    try {
        const message = await authService.registerEmployee({
            username,
            email,
            password,
            experienceLevel,
            technologyStack,
            businessUnit,
        });
        res.status(201).json({ message });
    } catch (error) {
        console.error('Error registering employee:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.loginEmployee = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.loginEmployee(username, password);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in employee:', error.message);
        res.status(500).json({ error: error.message });
    }
};
