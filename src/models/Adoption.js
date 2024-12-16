const mongoose = require('mongoose');
const {Schema} = mongoose

const AdoptionSchema = new mongoose.Schema({
  date: { type: String},
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
},
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);

module.exports = Adoption;