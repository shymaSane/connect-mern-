const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/Profile')
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
            //search our module for duplicated user
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
                                        //TODO: make profile
                                        const profile = new Profile({user_id: user._id, handle: user.name})
                                        profile.save()
                                            .then(() => {
                                                status = 200
                                                result.value = user
                                                result.pro = profile
                                                result.status = status
                                                res.status(status).send(result)
                                            })
                                            .catch((err) => {
                                                status = 500
                                                result.erorr = `${err}`
                                                result.status = status
                                                res.status(status).send(result)
                                            })
                                        
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
                        .then((match) =>{
                            if(match){
                                //if password is matched
                                //make json web tokens
                                status = 200; //ok
                                const payload = {user_name: user.name, user_id: user._id};
                                const options = {expiresIn: '2d'};
                                const secret = process.env.JWT_SECRET;
                                //generate tokens
                                const token = jwt.sign(payload,  secret, options)
                                //results
                                result.value = payload
                                result.status = status
                                result.value.token = `Bearer ${token}`
                                //send results
                                res.status(status).send(result)
                                
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
                            status = 500;
                            result.erorr = `${err}`;
                            result.status = status;
                            res.status(status).send(result)
                        })
                }else{
                    //no user 401 not authinticated
                    status = 401;
                    result.erorr = `user isnt authinticated, signup here`;
                    result.status = status;
                    res.status(status).send(result)
                }
            })
            .catch((err) =>{
                //server erorr
                status = 500;
                result.erorr = `${err}`;
                result.status = status;
                res.status(status).send(result)
            })
    },
    signout: (req, res) => {
        //TODO
    },
    getAll: (req, res) => {
        
        User.find({})
            .then((users) =>{
                res.status(200).send(users)
            })
            .catch((err) =>{
                res.status(500).send(err)
            })
    }
}

