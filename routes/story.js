const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story');
const tokenValidation = require('../utils/tokenValidation')
const isOwner = require('../utils/isOwner')
const storyValidation = require('../utils/storyValidation')

//@route GET api/story/:id
//@desc show stories
//@access users

router.get('/:id', tokenValidation, storyController.getStory)

//@route GET api/story/new
//@desc make new story
//@access owner

router.get('/new', tokenValidation, (req, res) => {
    res.status(200).send('new story form')
})

//@route POST api/story/new
//@desc post story to DB
//@access owner

 router.post('/new', tokenValidation, storyValidation, storyController.addStory)

//@route POST api/story/:id
//@desc POST comment
//@access user

router.post('/:id', tokenValidation, storyController.postComment)

//@route GET api/story/:id/edit
//@desc edit story form
//@access owner

router.get('/:id/edit', tokenValidation, storyController.getEditStory)

//@route PUT api/story/:id/edit
//@desc update story
//@access owner

router.put('/:id/edit', tokenValidation, storyValidation, storyController.editStory)

//@route DELETE api/story/:id
//@desc delete story
//@access owner

router.delete('/:id', storyController.deleteStory)

module.exports = router