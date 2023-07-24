const Employee = require('../Models/employee.js');
const Hackathon = require('../Models/hackathon.js');


// function to get employee profile
exports.getEmployeeProfile = async (employeeId) => {
    try {
        const employee = await Employee.findById(employeeId);
        return employee;
    } catch (error) {
        throw new Error('Server error');
    }
};


// function to register user for a hackathon
exports.registerForHackathon = async (hackathonName, employeeUsername) => {
    try {
        const hackathon = await Hackathon.findOne({ name: hackathonName });
        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        // Check if registration date is passed
        const currentDate = new Date();
        if (currentDate > hackathon.registrationEndDate) {
            throw new Error('Registration date has passed');
        }

        // Check if the hackathon slot is full
        if (hackathon.participants.length >= hackathon.maxSlots) {
            throw new Error('Hackathon slot is full');
        }

        const employee = await Employee.findOne({ username: employeeUsername });
        if (!employee) {
            throw new Error('Employee not found');
        }

        // Check if the employee satisfies the minimum experience level requirement
        if (employee.experienceLevel !== hackathon.minExperienceLevel) {
            throw new Error('Employee does not satisfy the minimum experience level requirement');
        }

        // Check if the employee is already registered in another hackathon
        if (employee.participatedHackathons.includes(hackathonName)) {
            throw new Error('Employee is already registered in another hackathon');
        }

        // If all conditions are met, register the employee for the hackathon
        hackathon.participants.push(employee._id);
        await hackathon.save();

        // Update the employee's participatedHackathons array
        employee.participatedHackathons.push(hackathon._id);
        await employee.save();

        return 'Employee registered for the hackathon successfully';
    } catch (error) {
        throw new Error('Internal server error');
    }
};

// function to get all hackathons in which user participated
exports.getParticipatedHackathons = async (employeeId) => {
    try {
        const employee = await Employee.findById(employeeId).populate('participatedHackathons');
        if (!employee) {
            throw new Error('Employee not found');
        }

        const participatedHackathons = employee.participatedHackathons;
        return participatedHackathons;
    } catch (error) {
        throw new Error('Internal server error');
    }
};



// Function to get hackathons based on status with pagination
exports.getHackathonsByStatus = async (status, page, limit) => {
    try {
        const currentDate = new Date();
        const query = {};

        if (status === 'upcoming') {
            query.startDate = { $gte: currentDate };
        } else if (status === 'active') {
            query.startDate = { $lte: currentDate };
            query.endDate = { $gte: currentDate };
        } else if (status === 'past') {
            query.endDate = { $lt: currentDate };
        }

        const hackathons = await Hackathon.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        return hackathons;
    } catch (error) {
        throw new Error('Internal server error');
    }
};

// Function to search hackathons by name, company, and technology stack
exports.searchHackathons = async (name, company, technologyStack) => {
    try {
        const searchQuery = {};
        if (name) {
            searchQuery.name = { $regex: name, $options: 'i' };
        }
        if (company) {
            searchQuery.company = { $regex: company, $options: 'i' };
        }
        if (technologyStack) {
            searchQuery.requiredTechnologyStack = { $in: [technologyStack] };
        }

        const hackathons = await Hackathon.find(searchQuery);
        return hackathons;
    } catch (error) {
        throw new Error('Internal server error');
    }
};



// Function to get all hackathons and their statuses
exports.getAllHackathons = async () => {
    try {
        const hackathons = await Hackathon.find();
        const hackathonsWithStatus = hackathons.map((hackathon) => ({
            _id: hackathon._id,
            name: hackathon.name,
            company: hackathon.company,
            startDate: hackathon.startDate,
            endDate: hackathon.endDate,
            status: hackathon.status, // Access the virtual 'status' property
        }));
        return hackathonsWithStatus;
    } catch (error) {
        throw new Error('Internal server error');
    }
};
