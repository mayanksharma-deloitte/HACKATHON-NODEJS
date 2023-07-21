const express=require('express');
const Hackathon=require('../Models/hackathon.js');
const Employee=require('../Models/employee.js');

exports.createHackathon=async(req,res)=>{

    const {
        name,
        company,
        startDate,
        endDate,
        maxSlots,
        minExperienceLevel,
        requiredTechnologyStack,
        registrationOpen,
        registrationEndDate,   
        
      } = req.body;


      try {
        // Create the hackathon
        const newHackathon = new Hackathon({
            name,
            company,
            startDate,
            endDate,
            maxSlots,
            minExperienceLevel,
            requiredTechnologyStack,
            registrationOpen,
            registrationEndDate,  
        });

        await newHackathon.save();
          // Associate the hackathon with the organizer (employee)
    const organizer = await Employee.findById(req.user._id);
    organizer.participatedHackathons.push(newHackathon._id);
    await organizer.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the hackathon.' });
  }
}




// Function to list all participants of a Hackathon
exports.listParticipants = async (req, res) => {
    const { hackathonName } = req.params;
  
    try {
      // Find the hackathon by name
      const hackathon = await Hackathon.findOne({ name: hackathonName });
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }
        // console.log(req.user.role);
        // console.log(req.user.username);
        
      // Check if the authenticated user is the organizer of the hackathon
      if (req.user.role !== 'organizer' || req.user.username !== hackathon.company) {
        return res.status(403).json({ error: 'You are not authorized to view participants for this hackathon' });
      }
  
      // Get the list of participants (employees) for the hackathon
      const participants = await Employee.find({ _id: { $in: hackathon.participants } });
 
      res.json(participants);
    } catch (error) {
      console.error('Error listing participants:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };





// Function to get the list of participants for a specific Hackathon with filtering
exports.getParticipantsByHackathon = async (req, res) => {
    const { hackathonName } = req.params;
      const { experienceLevel, technologyStack, businessUnit } = req.query;
    try {
      
      const hackathon = await Hackathon.findOne({ name: hackathonName }).populate({
        path: 'participants',
        match: {
          experienceLevel: experienceLevel || { $exists: true },
          technologyStack: technologyStack || { $exists: true },
          businessUnit: businessUnit || { $exists: true },
        },
      });
    //    console.log(hackathonName);
    //    console.log(hackathon);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }
  
      // Check if the user is an authorized organizer for this Hackathon
      if (req.user.role !== 'organizer' || req.user.username !== hackathon.company) {
        return res.status(403).json({ error: 'Forbidden. Access allowed only for organizers.' });
      }
  
      const participants = hackathon.participants.filter((participant) => {
        return (
          (!experienceLevel || participant.experienceLevel === experienceLevel) &&
          (!technologyStack || participant.technologyStack.includes(technologyStack)) &&
          (!businessUnit || participant.businessUnit === businessUnit)
        );
      });
  
      res.json(participants);
    } catch (error) {
      console.error('Error getting participants:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };





  // Update a Hackathon by its name
exports.updateHackathon = async (req, res) => {
    const { hackathonName } = req.params;
    const updates = req.body;
  
    try {
      // Find the hackathon by name
      const hackathon = await Hackathon.findOne({ name: hackathonName });
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }
  
      // Check if registration has started
      if (!hackathon.registrationOpen) {
        return res.status(400).json({ error: 'Registration has already started. Cannot modify the Hackathon' });
      }
  
      // Update the Hackathon's information
      Object.assign(hackathon, updates);
      await hackathon.save();
  
      res.json({ message: 'Hackathon updated successfully' });
    } catch (error) {
      console.error('Error updating Hackathon:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete a Hackathon by its name
exports.deleteHackathon = async (req, res) => {
    const { hackathonName } = req.params;
  
    try {
      // Find the hackathon by name
      const hackathon = await Hackathon.findOne({ name: hackathonName });
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }
  
      // Check if registration has started
      if (!hackathon.registrationOpen) {
        return res.status(400).json({ error: 'Registration has already started. Cannot delete the Hackathon' });
      }
  
      // Delete the Hackathon
      await hackathon.remove();
  
      res.json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
      console.error('Error deleting Hackathon:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  