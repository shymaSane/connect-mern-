const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')



module.exports={
    add: (req,res) =>{
        mongoose
        .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
            let result = {};
            let status = 201; //created
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
        let status = 200; 
        //connect to mongoose
        mongoose
        .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
            //contains email and passwrod
            const {email, password} = req.body
            //fetch user from DB
            User.findOne({email})
            .then((user) => {
                //compare passwrods with the one in the db 
                bcrypt.compare(password, user.password)
                    .then((res) => {
                        //if password is matched then res = true
                        if(res){
                            const payload = {user: user.email}
                            const options = {expiresIn: '2d'}
                            const secret = process.env.JWT_SECRET
                            const token = jwt.sign(payload, options, secret)

                            //result
                            result.value = user;
                            result.token = token;
                            result.status = status
                        } else {
                            //no match either password wrong or email
                            status = 401
                            result.erorr = "invalid password or email"
                            result.status = status; //unauthorized
                        }
                        res.status(status).send(result)
                })
                .catch((err) =>{
                    //bcrypt error
                    status = 500;
                    result.erorr = err;
                    result.status = status;

                    res.status(status).send(result)
                })

            })
            .catch((err) => {
                //db error 
                status = 404; //it may be avaliable with refresh
                result.erorr = err;
                result.status = status;

                res.status(status).send(result)
            })
        })
        .catch((err) => {
            //data base connection error
            status = 500;
            result.erorr = err;
            result.status = status;

            res.status(status).send(result)
        })
    }
}