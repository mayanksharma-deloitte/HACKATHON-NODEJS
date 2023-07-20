const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },

    experienceLevel: { type: String, enum: ['Junior', 'Mid-Level', 'Senior'] },
    technologyStack: [{ type: String }],
    businessUnit: { type: String },


    role: { type: String, enum: ['employee', 'organizer'], default: 'employee', },

    participatedHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', },],

})


const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;