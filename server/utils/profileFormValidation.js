//validate prfoile
const validator =  require('validator');

module.exports = (req, res, next) => {
    let {bio, rules, websites} = req.body
    let errors = {};
    //validate aginest null and undefined
    if(bio === null || bio === undefined) {bio = ""}
    if(rules === null || rules === undefined) {rules = ""}
    if(websites === null || websites === undefined) {websites = []}
    //validate length max(5000)
    if(!validator.isLength(rules, {min: 0, max: 5000})){
        errors.rules = "rules must be between 0 and 5000 characters"
    }
    if(!validator.isLength(bio, {min: 0, max: 5000})){
        errors.bio = "bio must be between 0 and 5000 characters"
    }

     //send erorr or success
     if(Object.keys(errors).length === 0){
        res.locals.profileUpdate = {bio, rules, websites}
        next()
    } else {
        res.status(400).send(erorrs)
    }
}
