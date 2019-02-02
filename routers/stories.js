const express = require('express');
const router = express.Router();

//@route GET api/stories/test
//@desc Tests routing
//@access public

router.get('/test', (req, res) => {
    res.json({mes: 'stories route working'})
})

module.exports = router