const mongoose = require("mongoose");
const Schema = mongoose.Schema

//name, bio, websites, rules, lcation, profile picture
const ProfileSchema = new Schema({
  user_id: {
      //refrence the model name 
      type: mongoose.Schema.Types.ObjectId,
      //refrences collection name 
      ref: 'User'
  },
  handle: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40
  },
  bio: {
    type: String,
  },
  rules: {
    type: String,
  },
  website: {
    type: String
  },
  profile_image:{
    type: String
  },
  
  //TODO > add stories refrence, followers and following 
  //CSV 
  // education: {
  //   type: [String]
  // }
  //comma sperated values
})

module.exports = mongoose.model('Profile', ProfileSchema)