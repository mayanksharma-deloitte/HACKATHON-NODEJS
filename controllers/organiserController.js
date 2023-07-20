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