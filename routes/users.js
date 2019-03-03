const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
//validate token
const validateToken = require('../utils/tokenValidation')
//validate input
const formValidation = require('../utils/formValidation')

//@route GET api/users/test
//@desc Tests routing
//@access public

router.post('/test/signup', formValidation.signUpValidation, userController.signup)
router.post('/test/login', userController.login)
router.get('/test/users', validateToken, userController.getAll)

module.exports = router

