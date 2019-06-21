const mongoose = require('mongoose');

//schema maps to a collection
const Schema = mongoose.Schema;

//user schema 

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})


module.exports = mongoose.model('User', UserSchema)