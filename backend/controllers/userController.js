const UserModel = require('../models/userModel');
const TokenModel = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const tokenService = require('../services/tokenServices');



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

const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (email === "" || password === "") {
        return res.status(400).json({error: "Fields must not be empty"})
    }

    try {
        const user = await UserModel.findOne({email: email});

        if(!user) {
            return res.status(400).json({errors: "User is not found"})
        }
        
        const passwordIsCorrect = await user.comparePasswords(password); 
 
        if (passwordIsCorrect) {

            const tokens = tokenService.generateTokens({uid: user._id, username: user.username});

            const token = await tokenService.saveToken(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({
                user: {username: user.username, uid: user._id}, 
                token: tokens.accessToken
            })
        } else {
            res.status(400).json({error: "Wrong credentials"}); 
        }

    } catch (e) {
        next(e)
    }
    
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


const logout = (req, res, next) => {
    const {refreshToken} = req.cookies;
    TokenModel
        .deleteOne({refreshToken})
        .then(token => {
            res.clearCookie("refreshToken");
            res.status(200).end();
        })
        .catch(error => next(error));

}

const refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const decodedData = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const token = await TokenModel.findOne({refreshToken});
        if (!decodedData || !token) {
            return res.status(401).json({errors: 'Unauthorized'})
        }

        const user = await UserModel.findById(decodedData.uid);

        const tokens = tokenService.generateTokens({uid: user._id, username: user.username});

        const newToken = await tokenService.saveToken(user._id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60 * 60 * 60 * 1000, httpOnly: true})
        return res.status(200).json({
            user: {username: user.username, uid: user._id}, token: tokens.accessToken
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    register, 
    login,
    verifyToken,
    logout, 
    refresh
}