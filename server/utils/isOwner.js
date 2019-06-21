//To check if the logged in user is the owner of the profile
module.exports = function isOwner (req, res, next) {
        const user_name = req.decoded.user_name;
        const handle = req.params.username;
        let status;
        let result = {};
        if(user_name == handle) {
            //this is how to pass in middleware
            req.handle = handle
            next()
        } else{
            status = 403; //registred but not allowed to enter this page
            result.error = "Forbidden" 
            res.status(status).send(result)
        }
    }
