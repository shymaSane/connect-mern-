const mongoose = require("mongoose");
const Schema = mongoose.Schema

//story itself/comments/likes 
const StorySchema = new Schema({
    //story has:
    //user_id
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    //title
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    //body
    story_body: {
        type: String,
        required: true,
    },
    //genere(CSV)
    genere: {
        type: [String],
        required: true
    },
    //tags(romantic, fanfiction, ...etc)
    tags: {
        type: [String],
        required: true
    },
    //likes(user_id)
    likes: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    //comments(user_is, text)
    comments: [
        {
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
            }
        }
    ],
    //date
    date: {
        type: Date,
        default: Date.now
    }
    //TODO: Link parts together
})

module.exports = mongoose.model('Story', StorySchema)