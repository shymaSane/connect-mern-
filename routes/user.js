const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
//validate token
const validateToken = require('../utils/tokenValidation')
//validate input
const formValidation = require('../utils/formValidation')

//@route GET api/user/test
//@desc Tests routing
//@access public

router.post('/signup', formValidation.signUpValidation, userController.signup)
router.post('/login', formValidation.loginValidation, userController.login)
router.get('/users', validateToken, userController.getAll)

module.exports = router

