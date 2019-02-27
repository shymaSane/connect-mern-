const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

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