const Story = require('../models/Story');
const User = require('../models/User')

module.exports = {
    getStory: (req, res) => {
        //TODO: add delete and edit button for owners
        const story_id = req.params.id;
        let result = {};
        let status = 200;
        //TODO: populate comments
        Story.findOne({_id: story_id})
        .exec()
        .then((story) => {
            if(story){
                result.value = story;
                status = 200
                res.status(status).send(result)
            } else {
                result.error = "Not found"
                status = 404
                res.status(status).send(result)
            }
        })
        .catch((err) => {
            res.status(500).send(err)

        })
    },
    addStory: (req, res) => {
        const user_id = req.decoded.user_id
        let {title, story_body, genere, tags} = req.body;
        let result = {};
        let status = 200;
        //CSV
        tags = tags.split(',')
        genere = genere.split(',')
        //save in DB
        //TODO: it saves more than one when click more times
        console.log(req.decoded)
        let newStory = new Story({user_id, title, story_body, genere, tags})
        newStory.save()
            .then(() => {
                result.story = newStory
                res.status(status).send(result)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    postComment: (req, res) => {

    },
    getEditStory: (req, res) => {
        //TODO: fetch exists story
    },
    editStory: (req, res) => {
        //TODO: post edited story 
    },
    deleteStory: (req, res) => {

    }
}