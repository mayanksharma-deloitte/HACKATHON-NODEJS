// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../Models/employee.js');

exports.registerEmployee = async (req, res) => {
    const { username, email, password, experienceLevel, technologyStack, businessUnit } = req.body;

    try {
        // Check if user already exists
        let existingEmployee = await Employee.findOne({ $or: [{ username }, { email }] });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Username or email already in use' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new employee
        const newEmployee = new Employee({
            username,
            email,
            password: hashedPassword,
            experienceLevel,
            technologyStack,
            businessUnit,
        });

        await newEmployee.save();

        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        console.error('Error registering employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginEmployee = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the employee by username
        const employee = await Employee.findOne({ username });
        if (!employee) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee._id, username: employee.username, role: employee.role }, 'key');

        res.json({ token });
    } catch (error) {
        console.error('Error logging in employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


