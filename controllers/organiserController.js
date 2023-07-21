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
        console.log(req.user.role);
        console.log(req.user.username);
        
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





