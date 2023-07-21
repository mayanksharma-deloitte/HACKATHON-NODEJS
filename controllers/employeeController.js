const express=require('express');
const Hackathon=require('../Models/hackathon.js');
const Employee=require('../Models/employee.js');

exports.getEmployeeProfile=async (req,res)=>{

try{
    const employee = req.user;
    res.json(employee);
}
catch(err){
    res.status(500).json({ error: 'Server error' });
}
}


// function for employee registration in a hackathon
exports.registerForHackathon = async (req, res) => {
    const { hackathonName, employeeUsername } = req.body;
  
    try {
      // Find the hackathon by name
      const hackathon = await Hackathon.findOne({ name: hackathonName });
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }
  
      // Check if registration date is passed
      const currentDate = new Date();
      if (currentDate > hackathon.registrationEndDate) {
        return res.status(400).json({ error: 'Registration date has passed' });
      }
  
      // Check if the hackathon slot is full
      if (hackathon.participants.length >= hackathon.maxSlots) {
        return res.status(400).json({ error: 'Hackathon slot is full' });
      }
  
      // Find the employee by username
      const employee = await Employee.findOne({ username: employeeUsername });
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Check if the employee satisfies the minimum experience level requirement
      if (employee.experienceLevel !== hackathon.minExperienceLevel) {
        return res.status(400).json({ error: 'Employee does not satisfy the minimum experience level requirement' });
      }
  
      // Check if the employee is already registered in another hackathon
      if (employee.participatedHackathons.includes(hackathonName)) {
        return res.status(400).json({ error: 'Employee is already registered in another hackathon' });
      }
  
      // If all conditions are met, register the employee for the hackathon
      hackathon.participants.push(employee._id);
      await hackathon.save();
  
      // Update the employee's participatedHackathons array
      employee.participatedHackathons.push(hackathon._id);
      await employee.save();
  
      res.json({ message: 'Employee registered for the hackathon successfully' });
    } catch (error) {
      console.error('Error registering for hackathon:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  



// function to get hackathons based on status with pagination
exports.getHackathonsByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
  
      const query = {};
  
      // Set the query based on the status
      const currentDate = new Date();
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
  
      res.json(hackathons);
    } catch (error) {
      console.error('Error getting hackathons:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };




// Function to search hackathons by name, company, and technology stack
exports.searchHackathons = async (req, res) => {
    try {
      const { name, company, technologyStack } = req.query;
  
      // Build the search query based on the provided parameters
      const searchQuery = {};
      if (name) {
        searchQuery.name = { $regex: name, $options: 'i' }; // Case-insensitive search
      }
      if (company) {
        searchQuery.company = { $regex: company, $options: 'i' };
      }
      if (technologyStack) {
        searchQuery.requiredTechnologyStack = { $in: [technologyStack] };
      }
  
      // Find hackathons based on the search query
      const hackathons = await Hackathon.find(searchQuery);
  
      res.json(hackathons);
    } catch (error) {
      console.error('Error searching hackathons:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  // Controller function to get the hackathons participated by the employee
exports.getParticipatedHackathons = async (req, res) => {
    try {
      // Find the employee by ID and populate the 'participatedHackathons' field
      const employee = await Employee.findById(req.user.id).populate('participatedHackathons');
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Extract the participated hackathons from the populated field
      const participatedHackathons = employee.participatedHackathons;
  
      res.json(participatedHackathons);
    } catch (error) {
      console.error('Error getting participated hackathons:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  




// Get all hackathons and their statuses
exports.getAllHackathons = async (req, res) => {
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
  
      res.json(hackathonsWithStatus);
    } catch (error) {
      console.error('Error getting hackathons:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
