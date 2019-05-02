//validate story form 
const validator =  require('validator');

//we need this function as validator only check for empty and not undefined

const isEmpty = (value) => {
    return value === null || 
        value === undefined ||
        (typeof(value) === 'object' && Object.keys(value).lenght === 0) ||
        (typeof(value) === 'string' && value.trim().length === 0) ||
        (typeof(value) === 'array' && value.length === 0) 
}

module.exports = (req, res, next) => {
    //post body
    const{title, story_body, genere, tags, comments} = req.body;
    let errors = {}

    //check if title isnt empty and length is allowed
    if(!validator.isLength(title, {min: 1, max: 100})){
        errors.title = 'title must be between 1 to 100 charachters'
    }
    if(isEmpty(title)){
        errors.title = "title is empty, please enter your title"
    }

    //body validation
    if(isEmpty(story_body)){
        errors.story_body = "story_body is empty, please enter your story_body"
    }
    // if(!validator.isLength(body, {min: 1, max: 100})){
    //     errors.body = 'body must be between 1 to 100 charachters'
    // }

    //genere validation
    if(isEmpty(genere)){
        errors.genere = "genere is empty, please enter your genere"
    }

    //tags validation
    if(isEmpty(tags)){
        errors.tags = "tags is empty, please enter your tags"
    }

    //comments validation
    if(!isEmpty(comments)){
        comments.forEach((comment) => {
            if(isEmpty(comment.text)){
                errors.comment = "comment is empty, please enter your comment"
            }
        })
    }

    //send errors or next
    if(Object.keys(errors) === 0) {
        next()
    } else {
        res.status(400).send(errors)
    }
     
}