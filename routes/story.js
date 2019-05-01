const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story');
const tokenValidation = require('../utils/tokenValidation')
const isOwner = require('../utils/isOwner')

//@route GET api/story/:id
//@desc show stories
//@access users

router.get('/:id', tokenValidation, storyController.getStory)

//@route GET api/story/new
//@desc make new story
//@access owner

router.get('/new', tokenValidation, isOwner, (req, res) => {
    res.status(200).send('new story form')
})

//@route GET api/story/new
//@desc spost story to DB
//@access owner

router.post('/new', tokenValidation, isOwner, storyController.addStory)

//@route GET api/story/:id/edit
//@desc edit story form
//@access owner

router.get('/:id/edit', storyController.getEditStory)

//@route GET api/story/:id/edit
//@desc update story
//@access owner

router.put('/:id/edit', storyController.editStory)

//@route GET api/story/:id
//@desc delete story
//@access owner

router.delete('/:id', storyController.deleteStory)

module.exports = router