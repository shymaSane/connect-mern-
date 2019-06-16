const Story = require('../models/Story');
const User = require('../models/User');
const Comment = require('../models/Comment')

module.exports = {
    getStory: (req, res) => {
        //TODO: add delete and edit button for owners
        const story_id = req.params.id;
        let result = {};
        let status = 200;
        //TODO: populate comments
        Story.findOne({_id: story_id})
            .populate('comments')
            .exec()
            .then((story) => {
                if(story){
                    result.value = story;
                    // result.user = story.user_id.name
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
        console.log(req.body)
        let result = {};
        let status = 200;
        //CSV
        tags = tags.split(',')
        genere = genere.split(',')
        //save in DB
        //TODO: it saves more than one when click more times
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
        //TODO: upvotes and downvotes, text validation
        const{text} = req.body;
        const story_id = req.params.id
        const user_id = req.decoded.user_id
        let result = {};
        //store comment in Comment schema:
        let newComment = new Comment({
                comments: {
                    text, story_id, user_id
                }
        })
        newComment.save()
            .then(() => {
                //update comments id in story schema
                Story.findOneAndUpdate({_id: story_id}, {comments: newComment._id}, {new: true})
                    .then(() => {
                       result.comment = newComment
                        res.status(200).send(result)
                    })
                    .catch((err) => {
                        res.status(500).send(err)
                    })
                
            })
            .catch((err) => {
                res.status(500).send(err)
            })
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