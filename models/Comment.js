const mongoose = require('mongoose');
let Schema = mongoose.Schema

//comment schema

const CommentSchema = new Schema({
     comments: [
        {
            story_id: {
                type: Schema.Types.ObjectId,
                ref: "Story"
            },
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true,
                maxlength: 5000
            },
            date: {
                type: Date,
                default: Date.now
            },
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