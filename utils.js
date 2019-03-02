const jwt = require('jsonwebtoken');
const validator = require('validator')

module.exports = {
    tokenValidation: (req, res, next) => {
        //get token from sent headers
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let result;
        
        //if toke is there
        if(token){
            token = token.slice(7, token.length)
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err){
                    result = {
                        status: 401,
                        erorr: `${err}`
                    };
                    res.status(401).send(result)
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else{
            //there is not token
            result = {
                status: 401,
                erorr: "Authontication required, Token is missing"
            }
            res.status(401).send(result)
        }
    },
    validateForm: (req, res, next) => {
        const {name, email, password, password2} = req.body
        let result = {}
        //check if name isnt empty
        const emptyName = validator.isEmpty(name)
        //check if email is valid
        const validateEmail = validator.isEmail(email)
        //check if password isnt empty
        const emptyPassword = validator.isEmpty(password)
        const emptypassword2 = validator.isEmpty(password2)
        //check if passwords if equal
        const validatePassword = validator.equals(password, password2)
        
        if((validateEmail && validatePassword === true) && (emptyName && emptyPassword && emptypassword2 === false)){
            next()
        } else {
            if(validateEmail === false){
                result.email = "Unvalied email adress"
            } if(validatePassword === false){
                result.password = "Password isnt matching"
            } if(emptyName || emptyPassword || emptypassword2 === true){
                result.empty = "please fill here"
            }
            res.status(400).send(result)
        }
        
    }
}