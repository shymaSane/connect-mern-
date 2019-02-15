const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

//@route GET api/users/test
//@desc Tests routing
//@access public

router.get('/test', userController.add)

module.exports = router

