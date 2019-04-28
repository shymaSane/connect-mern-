const User = require('../models/User')
const Profile = require('../models/Profile')

module.exports = {
    getProfile: (req, res) =>{
        //take user_name from token 
        // const tokenPayload = JSON.stringify(req.decoded)
        const user_name = req.decoded.user_name
        let result = {};
        let status;
        //if user_name params is equal to user_name from token then enable edit and delete
        Profile.findOne({handle: req.params.username})
            .then((profile)=> {
                if(profile.handle == user_name){
                    status = 200;
                    result.value = profile
                    result.properties = `editable and deletable`
                } else {
                    status = 200;
                    result.value = profile
                    result.properties = `no edit or delete`
                }
                res.status(status).send(result)
            })
            .catch((err) => {
                status = 500;
                result.error = err
                res.status(status).send(result)
            })
    },
    getEditProfile: (req, res) => {
        //find the user and send information to the form 
        const handle = req.handle
        Profile.findOne({handle})
            .exec()
            .then((profile) => {
                //TODO: add user information(email && password)
                res.status(200).send({profile})
            })
            .catch((err) =>{
                res.status(500).send(err)
            })
    },
    putEditProfile: (req, res) =>{
        //TODO: picture, password, email
        //TODO: do not upload empty, undefined, null fields
        // websites is a comma sperated values
        let{bio, rules, websites} = req.body

        websites = websites.split(',')
        //if we didnt user object then we have to use res.json
        let result = {};
        const handle = req.params.username
        Profile.findOneAndUpdate({handle}, 
            {$set:{bio, rules, websites}},
            {new: true}
            )
            .exec()
            .then((profile) => {
                result.value = profile;
                res.status(200).send(result)
                
            })
            .catch((err) =>{
                res.status(500).send(err)
            })

    },
    deleteProfile: () =>{

    }
}