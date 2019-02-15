const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

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


//encrypt password before save:
UserSchema.pre('save', (next) => {
    //current user schema
    const user = this
    //make sure t not hash is the use isnt new
    if(!user.isModified || !user.isNew){
        next()
    } else {
        bcrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
            if(err){
                console.log(`error in hashing password for user:${user.name}`)
                next(err)
            } else {
                user.password = hash
                next()
            }
        })
    }
    
})


module.exports = mongoose.model('User', UserSchema)