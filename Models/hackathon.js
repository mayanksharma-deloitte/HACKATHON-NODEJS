const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({

  name: { type: String, required: true ,unique:true},
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


// Virtual property to get the Hackathon's status
hackathonSchema.virtual('status').get(function () {
    const currentDate = new Date();
   if(!this.registrationOpen){
    return 'closed';
   }
    else if (currentDate > this.registrationEndDate) {
      return 'closed';
    } else if (this.participants.length >= this.maxSlots) {
      return 'full';
    } else {
      return 'open';
    }
  });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
