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
    likes: [{
            type: Schema.Types.ObjectId,
            ref: "User"
    }],
    //date
    date: {
        type: Date,
        default: Date.now
    },
    //TODO: Link parts together
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model('Story', StorySchema)