const Hackathon = require('../Models/hackathon.js');
const Employee = require('../Models/employee.js');


// function to create hackathon
exports.createHackathon = async (hackathonData, organizer) => {
    try {
        const newHackathon = new Hackathon(hackathonData);
        await newHackathon.save();

        // Associate the hackathon with the organizer (employee)
        organizer.participatedHackathons.push(newHackathon._id);
        await organizer.save();

        return newHackathon;
    } catch (error) {
        throw new Error('Failed to create the hackathon.');
    }
};

// function to list participants
exports.listParticipants = async (hackathonName, organizer) => {
    try {
        const hackathon = await Hackathon.findOne({ name: hackathonName });
        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        // Check if the authenticated user is the organizer of the hackathon
        if (organizer.role !== 'organizer' || organizer.username !== hackathon.company) {
            throw new Error('You are not authorized to view participants for this hackathon');
        }

        const participants = await Employee.find({ _id: { $in: hackathon.participants } });
        return participants;
    } catch (error) {
        throw new Error('Internal server error');
    }
};


// function to get participants
exports.getParticipantsByHackathon = async (hackathonName, filters) => {
    try {
        const hackathon = await Hackathon.findOne({ name: hackathonName }).populate({
            path: 'participants',
            match: {
                experienceLevel: filters.experienceLevel || { $exists: true },
                technologyStack: filters.technologyStack || { $exists: true },
                businessUnit: filters.businessUnit || { $exists: true },
            },
        });

        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        const participants = hackathon.participants.filter((participant) => {
            return (
                (!filters.experienceLevel || participant.experienceLevel === filters.experienceLevel) &&
                (!filters.technologyStack || participant.technologyStack.includes(filters.technologyStack)) &&
                (!filters.businessUnit || participant.businessUnit === filters.businessUnit)
            );
        });

        return participants;
    } catch (error) {
        throw new Error('Internal server error');
    }
};

// function to update hackathon
exports.updateHackathon = async (hackathonName, updates) => {
    try {
        const hackathon = await Hackathon.findOne({ name: hackathonName });
        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        // Check if registration has started
        if (!hackathon.registrationOpen) {
            throw new Error('Registration has already started. Cannot modify the Hackathon');
        }

        Object.assign(hackathon, updates);
        await hackathon.save();
    } catch (error) {
        throw new Error('Internal server error');
    }
};

// delete a hackathon if it is not started yet.
exports.deleteHackathon = async (hackathonName) => {
    try {
        const hackathon = await Hackathon.findOne({ name: hackathonName });
        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        // Check if registration has started
        if (!hackathon.registrationOpen) {
            throw new Error('Registration has already started. Cannot delete the Hackathon');
        }

        await hackathon.remove();
    } catch (error) {
        throw new Error('Internal server error');
    }
};
