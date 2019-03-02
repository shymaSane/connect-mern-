const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
//validate users
const validation = require('../utils')
console.log(validation)
//@route GET api/users/test
//@desc Tests routing
//@access public

router.post('/test/signup', validation.validateForm, userController.signup)
router.post('/test/login', userController.login)
router.get('/test/users', validation.tokenValidation, userController.getAll)

module.exports = router

