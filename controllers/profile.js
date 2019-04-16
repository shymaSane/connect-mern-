const User = require('../models/User')
const Profile = require('../models/Profile')

module.exports = {
    getCurrentUserProfile: (req, res) =>{
        //TODO: check if user is the owner f the profile or visitor 
        //take user_name from token 
        const tokenPayload = JSON.stringify(req.decoded)
        const name = JSON.parse(tokenPayload).user
        let result = {};
        let status;
        //find user in DB
        User.findOne({name})
            .then((user) =>{
                if(user){
                    // status = 200;
                    // result.status = status;
                    // result.value = user
                    // res.status(status).send(result) 
                    
                    //check if there is profile in db or not

                }else{
                    //there is no user
                    status = 409;//conflict
                    result.erorr = "user not found";
                    result.status = status;
                    res.status(status).send(result)
                }
            })
            .catch((err) =>{
                //interal eror
                status = 500;//conflict
                result.erorr = err;
                result.status = status;
                res.status(status).send(result)
            })

    },
    editProfile: () => { 

    },
    deleteProfile: () =>{

    }
}