const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../Models/employee.js');

exports.registerEmployee = async (userData) => {
    const { username, email, password, experienceLevel, technologyStack, businessUnit } = userData;

    try {
        // Check if user already exists
        let existingEmployee = await Employee.findOne({ $or: [{ username }, { email }] });
        if (existingEmployee) {
            throw new Error('Username or email already in use');
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

        return 'Employee registered successfully';
    } catch (error) {
        throw new Error('Internal server error');
    }
};

exports.loginEmployee = async (username, password) => {
    try {
        // Find the employee by username
        const employee = await Employee.findOne({ username });
        if (!employee) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee._id, username: employee.username, role: employee.role }, 'key');
        return token;
    } catch (error) {
        throw new Error(error);
    }
};
