const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

//bring salts rounds
const environment = process.env.NODE_ENV ;
const salt = require('../config')[environment].saltingRounds;

module.exports = {
    signup: (req, res) => {
        //to make new account
        //1- make sure thats not a duplicated account
            //to sent the result later
            let status = 200; //ok
            let result = {};
            //extract body
            const{name, email, password} = req.body
            //search our modle for duplicated user
            User.findOne({email})
                .then(user =>{
                    if(user){
                        //its duplicated
                        result.erorr = 'This email has account';
                        result.status = 409;//conflicted
                        result.value = user;
                        res.status(status).send(result)
                    }else{
                        //its a new user
                        const user = new User({name, email, password});
                        //hash password
                        bcrypt.hash(user.password, salt, (err, hash) =>{
                            if(err){
                                //server error
                                status = 500
                                result.erorr = `${err}`
                                result.status = status
                                res.status(status).send(result)
                            } else {
                                user.password = hash
                               //save user
                                user.save()
                                    .then(() => {
                                        status = 200
                                        result.value = user
                                        result.status = status
                                        res.status(status).send(result)
                                    }) 
                                    .catch((err) => {
                                        status = 500
                                        result.erorr = `${err}`
                                        result.status = status
                                        res.status(status).send(result)
                                    })
                            }
                        })
                        
                    }
                    //send results
                    // res.status(status).send(result)
                })
                .catch(err => {
                    //server error
                    status = 500
                    result.erorr = `${err}`
                    result.status = status
                    //send results
                    res.status(status).send(result)
                })
        
    },
    login: (req, res) => {
        //find user by email
        const{email, password} = req.body;
        let status = 200;
        let result = {};
        User.findOne({email})
            .then(user => {
                if(user){
                    //there is user now match passwords
                    bcrypt.compare(password, user.password)
                        .then((res) =>{
                            if(res){
                                //if password is matched
                            } else {
                                //password isnt matched
                                status = 409;//conflict
                                result.erorr = "password isnt matched";
                                result.status = status;
                                res.status(status).send(result)
                            } 
                        })
                        .catch(err => {
                            //server erorr
                        })
                }else{
                    //no user 401 not authinticated
                }
            })
            .catch((err) =>{
                //server erorr
            })
    },
    signout: (req, res) => {

    }
}

// module.exports={
//     add: (req,res) =>{
//         let result = {};
//         let status = 201; //created
//         mongoose
//         .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
//         .then(() => {
//             const {name, email, password} = req.body
//             //create new document and save user information in it
//             const user = new User({name, email, password})
//             //save document 
//             user.save()
//             .then((user) => {
//                 result.status = status
//                 result.value = user
//             })
//             .catch((err) => {
//                 status = 500
//                 result.status = status
//                 result.error = err
//             })
//             res.status(status).send(result)
//         })
//         .catch((err) => {
//             status = 500
//             result.status = status
//             result.error = err
//             res.status(status).send(result)
//         })
//     },
//     login: (req, res) => {
//         let result = {}
//         let status = 200; 
//         //connect to mongoose
//         mongoose
//         .connect(process.env.DB_URI,  { useCreateIndex: true, useNewUrlParser: true })
//         .then(() => {
//             //contains email and passwrod
//             const {email, password} = req.body
//             //fetch user from DB
//             User.findOne({email: `${email}`})
//             .then((user) => {
//                 //compare passwrods with the one in the db 
//                 bcrypt.compare(password, user.password)
//                     .then((res) => {
//                         //if password is matched then res = true
//                         if(res){
//                             const payload = {user: user.email}
//                             const options = {expiresIn: '2d'}
//                             const secret = process.env.JWT_SECRET
//                             const token = jwt.sign(payload, options, secret)

//                             //result
//                             result.value = user;
//                             result.token = token;
//                             result.status = status
//                         } else {
//                             //no match either password wrong or email
//                             status = 401
//                             result.erorr = "invalid password or email"
//                             result.status = status; //unauthorized
//                         }
//                         res.status(status).send(result)
//                 })
//                 .catch((err) =>{
//                     //bcrypt error
//                     status = 500;
//                     result.erorr = err;
//                     result.status = status;

//                     res.status(status).send(result)
//                 })

//             })
//             .catch((err) => {
//                 //db error 
//                 status = 404; //it may be avaliable with refresh
//                 result.erorr = err;
//                 result.status = status;

//                 res.status(status).send(result)
//             })
//         })
//         .catch((erorr) => {
//             //data base connection error
//             status = 500;
//             result.erorr = erorr;
//             result.status = status;

//             res.status(status).send(result)
//         })
//     },
//     getAll: (req, res) => {
//         //to get all users
        
//     }
// }