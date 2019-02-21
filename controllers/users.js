const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/users')



module.exports={
    add: (req,res) =>{
        mongoose
        .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
            let result = {};
            let status = 201
            const {name, email, password} = req.body
            //create new document and save user information in it
            const user = new User({name, email, password})
            //save document 
            user.save()
            .then((user) => {
                result.status = status
                result.value = user
            })
            .catch((err) => {
                status = 500
                result.status = status
                result.error = err
            })
            res.status(status).send(result)
        })
        .catch((err) => {
            status = 500
            result.status = status
            result.error = err
            res.status(status).send(result)
        })
    },
    login: (req, res) => {
        let result = {}
        let status = 202; //accepted
        //fetch user
        mongoose
        .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
            //contains email and passwrod
            const {email, password} = req.body
            result.value = {email, password};
            result.status; //accepted
            User.findOne({email})
            .then((user) => {
                //if the user is there do sth
            })
            .catch((err) => {
                //if the user didnt singup 
            })
        })
        .catch((err) => {
            
        })
    }
}