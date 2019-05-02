const Story = require('../models/Story');
const User = require('../models/User')

module.exports = {
    getStory: (req, res) => {
        //TODO: add delete and edit button for owners
        const story_id = req.params.id;
        let result = {};
        let status = 200;
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
        //TODO: add new stry to db
        //need validation
        // const {title, body, genere, tags, likes, comments, date }
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