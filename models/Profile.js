const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user_id: {
      //refrence the model name 
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  story_text: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Profile', ProfileSchema)