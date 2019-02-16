const mongoose = require('mongoose');
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
    }
}