const jwt = require('jsonwebtoken');
// const validator = require('validator')

const validateToken = (req, res, next) => {
    
        //get token from sent headers
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        let result;
        
        //if toke is there
        if(token){
            //to slice 'Bearer ' from it
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
    
    
}

module.exports = validateToken