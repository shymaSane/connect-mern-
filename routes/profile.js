const express = require('express');
const router = express.Router();
const tokenValidation = require('../utils/tokenValidation')
const profileController = require('../controllers/profile')

//@route GET api/profiles/test
//@desc Tests routing
//@access public

router.get('/test/:user_name', tokenValidation, profileController.getProfile)



module.exports = router