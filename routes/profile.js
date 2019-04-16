const express = require('express');
const router = express.Router();
const tokenValidation = require('../utils/tokenValidation')
const profileController = require('../controllers/profile')


//@route GET api/profile/username
//@desc profile user
//@access logged in users

router.get('/:username', tokenValidation, profileController.getCurrentUserProfile)

//@route GET api/profile/username
//@desc profile user
//@access current user only

router.get('/:username/edit', tokenValidation)

module.exports = router


//user experince >>>
//when signup route to profile/username/edit and make profile for new user 
//when click name and route to user check if it same user then allow edit else 