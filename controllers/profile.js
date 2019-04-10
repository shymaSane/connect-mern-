const Profile = require('../models/Profile')

module.exports = {
    getProfile: (req, res) =>{
        //take user_name from token 
        const tokenPayload = JSON.stringify(req.decoded)
        res.send(tokenPayload)

    },
    editProfile: () => {

    },
    deleteProfile: () =>{

    }
}