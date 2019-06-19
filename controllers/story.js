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
        // newComment.save()
        Comment.findOneAndUpdate({story_id}, {$push:{comments: {text, story_id, user_id}}}, {safe: true, upsert: true, new: true})
            .then((comment) => {
                //update comments id in story schema
                Story.findOneAndUpdate({_id: story_id}, {$push:{comments: comment._id}}, {new: true})
                    .then((story) => {
                        if(!story){
                            result.error = "Not found"
                            status = 404
                            res.status(status).send(result)
                        } else {
                            result.comment = comment
                            res.status(200).send(result)
                        }
                       
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
        const user_id = req.decoded.user_id
        const story_id = req.params.id
        let result = {};
        //find story
        Story.findOne({_id: story_id})
            .then((story) => {
                if(!story){
                    //if there is no such story in db
                    result.err = 'there is no story'
                    res.status(404).send(result)
                } else {
                    //make sure user is the owner
                    if(story.user_id == user_id){
                        //return story to edit
                        result.story = story
                        res.status(200).send(result)
                    } else {
                        result.err = 'Unauthorized';
                        res.status(401).send(result)
                    }
                }

            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    editStory: (req, res) => {
        let {title, story_body, genere, tags} = req.body;
        const story_id = req.params.id;

        //CSV
        tags = tags.split(',');
        genere = genere.split(',');

        //update story
        let result = {};
        Story.findByIdAndUpdate({_id: story_id}, {title, story_body, genere, tags}, {new: true})
            .then(story => {
                if(!story) {
                    //if there is no such story in db
                    result.err = 'there is no story'
                    res.status(404).send(result)                    
                } else{
                    //send updated story
                    result.story = story
                    res.status(200).send(result)
                } 
            })
            .catch((err) => {
                res.status(500).send(err)
            })

    },
    deleteStory: (req, res) => {
        //delete story and comments related to it in db
        const story_id = req.params.id;
        const user_id = req.decoded.user_id;
        let result = {};
        //delete story
        //note: remove returns docs while delete returns nothing
        Story.findOne({_id: story_id})
            .then((story) => {
                if(!story){
                    //if there is no such story in db
                    result.err = 'there is no story'
                    res.status(404).send(result)
                } else {
                    //make sure user is the owner
                    if(story.user_id == user_id){
                        //return story to edit
                        Story.findByIdAndDelete({_id: story_id})
                            .then(() => {
                                //delete comments
                                Comment.findOneAndDelete({story_id})
                                    .then(() => {
                                        result.value = "deleted successfuly"
                                        res.status(200).send()
                                    })
                                    .catch((err) => {
                                        res.status(500).send(err)
                                    })
                                
                            })
                            .catch((err) => {
                                res.status(500).send(err)
                            })
                    } else {
                        result.err = 'Unauthorized';
                        res.status(401).send(result)
                    }
                }

            })
            .catch((err) => {
                res.status(500).send(err)
            })
        
          
    },
    getComment: (req, res) => {
        let user_id = req.decoded.user_id;
        let story_id = req.params.id;
        let comment_id = req.params.comment_id
        let result = {}

        //make sure is owner 
        Comment.findOne({comments:{$elematch:{_id: comment_id}}})
            .then((comment) => {
                if(comment.user_id == user_id){
                    result.comment = comment
                    res.status(200).send(result)
                } else {
                    result.err = 'Unauthorized';
                    res.status(401).send(result)
                }
                
            })
            .catch(() => {
                res.status(500).send(err);
            })
    

    },
    editComment: (req, res) => {

        //post edited comment
        const {text} = req.body;
    },
    
    deleteComment: (req, res) => {

    }
}