const express = require('express');
const router = express.Router();

//@route GET api/profiles/test
//@desc Tests routing
//@access public

router.get('/test', (req, res) => {
    res.json({mes: 'profiles route working'})
})

module.exports = router