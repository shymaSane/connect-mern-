const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

//@route GET api/users/test
//@desc Tests routing
//@access public

router.post('/test/signup', userController.signup)
router.post('/test/login', userController.login)
router.get('/test/users', userController.getAll)

module.exports = router

