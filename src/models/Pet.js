const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  name: { type: String, required: true },
  animal: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  size: { type: String, required: true },
  adopted: {type: Boolean, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true
  }
});

PetSchema.virtual('thumbnail_url').get(function(){
  return `http://localhost:3000/files/${this.thumbnail}`
})

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;