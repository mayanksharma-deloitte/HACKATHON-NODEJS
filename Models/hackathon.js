const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({

  name: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxSlots: { type: Number, required: true },
  minExperienceLevel: { type: String, enum: ['Junior', 'Mid-Level', 'Senior'] },
  requiredTechnologyStack: [{ type: String }],
  registrationOpen: { type: Boolean, default: true },
  registrationEndDate: {type: Date,required: true,},
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],

});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
