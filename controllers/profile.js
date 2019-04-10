// const Profile = require()

module.exports = {
    getProfile: (req, res) =>{
        //take profile handle from token as user name in it
        res.send(`${req.params.user_name}`)

    },
    editProfile: () => {

    },
    deleteProfile: () =>{

    }
}