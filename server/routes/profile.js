const express = require('express');
const router = express.Router();
const tokenValidation = require('../utils/tokenValidation')
const profileController = require('../controllers/profile')
const profileFormValidation = require('../utils/profileFormValidation')
//*****************************************************************
//********** NOTE:
//While import is indeed part of ES6, it is unfortunately not yet supported in NodeJS by default, and has only very recently landed support in browsers.
//write in git (node --experimental-modules my-app.mjs)
//import isOwner from '../utils/isOwner.mjs'
//*****************************************************************
const isOwner = require('../utils/isOwner')


//@route GET api/profile/username
//@desc profile user
//@access logged in users

router.get('/:username', tokenValidation, profileController.getProfile)

//@route GET api/profile/username/edit
//@desc edit profile
//@access owner

router.get('/:username/edit', tokenValidation, isOwner, profileController.getEditProfile)

//@route GET api/profile/username/edit
//@desc update profile
//@access owner
router.put('/:username/edit', tokenValidation, isOwner, profileFormValidation, profileController.putEditProfile)

//@route GET api/profile/username/edit
//@desc update profile
//@access owner

router.delete('/:username', tokenValidation, isOwner, profileController.deleteProfileAndUser)


module.exports = router


//user experince >>>
//when signup route to profile/username/edit and make profile for new user 
//when click name and route to user check if it same user then allow edit else  