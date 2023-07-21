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










