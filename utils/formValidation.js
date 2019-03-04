const validator =  require('validator');

const isEmpty = (value) => {
   return value === null ||
    value === undefined ||
    (typeof(value) === 'object' && Object.keys(value).lenght === 0) ||
    (typeof(value) === 'string' && value.trim().length === 0)}

const signUpValidation = (req, res, next) => {
    const{name, email, password, password2} = req.body 
    let erorrs = {};
    //ckeck is email valid
    if(!validator.isEmail(email)){
        erorrs.email = "unvalid email adress"
    }
    //check if name length between 4 and 20
    if(!validator.isLength(name, {min: 4, max: 20})){
        erorrs.name = "name must be between 4 and 20 characters"
    }
    //check if passwords matching
    if(!validator.equals(password, password2)){
        erorrs.password = "passwords are not matching, please enter your password again"
    }
    //check if password length between 4 and 20
    if(!validator.isLength(password, {min: 4, max: 20})){
        erorrs.password = "password must be between 4 and 20 characters"
    }
    //check if fields are empty
    if(isEmpty(name)){
        erorrs.name = "Name field is required"
    }
    if(isEmpty(email)){
        erorrs.email = "Email field is required"
    }
    if(isEmpty(password)){
        erorrs.password = "Password field is required"
    }
    //send erorr or success
    if(Object.keys(erorrs).length === 0){
        next()
    } else {
        res.status(400).send(erorrs)
    }
}

module.exports = {signUpValidation}