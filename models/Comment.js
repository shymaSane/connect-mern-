const mongoose = require('mongoose');
let Schema = mongoose.Schema

//comment schema

const CommentSchema = new Schema({
    //TODO: fix threaded comments problem
    story_id: {
        type: Schema.Types.ObjectId,
        ref: "Story"
    },
     comments: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true,
                maxlength: 2000
            },
            date: {
                type: Date,
                default: Date.now
            },
            //to make threaded comments
            replies: [this],
            
            upvotes: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }],
            downvotes: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }]
        }
    ]
})

module.exports = mongoose.model('Comment', CommentSchema)



