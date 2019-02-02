const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@desc Tests routing
//@access public

router.get('/test', (req, res) => {
    res.json({mes: 'users route working'})
})

module.exports = router