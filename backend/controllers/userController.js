const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    const {username, password, email} = req.body;
    const newuser = new UserModel({username, password, email});

    newuser
        .save()
        .then(user => {
            res.status(201).json({user})
        })
        .catch(error => {
            next(error)
        })
        
}

const login = (req, res, next) => {
    const {email, password} = req.body;

    if (email === "" || password === "") {
        return res.status(400).json({error: "Fields must not be empty"})
    }

    UserModel
        .findOne({email: email})
        .then(user => {

            if(!user) {
                return res.status(400).json({errors: ["User is not found"]})
            }
            
            const passwordIsCorrect =  user.comparePasswords(password); 
            if (passwordIsCorrect) {
                const token = user.createToken();
                res.status(200).json({user: {username: user.username, uid: user._id}, token})
            } else {
                res.status(400).json({error: "Wrong credentials"}); 
            }
            
        })
        .catch(error => next(error));
}


const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({user: decodedToken});
    } catch (e) {
        return res.status(401).json({error: "Must be authenticated"});
    }
}


module.exports = {
    register, 
    login,
    verifyToken
}