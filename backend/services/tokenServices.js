const jwt = require('jsonwebtoken');
const TokenModel = require("../models/tokenModel");

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_ACCESS_LIFETIME});
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, 
         {expiresIn: process.env.JWT_REFRESH_LIFETIME});

    return {
        accessToken, 
        refreshToken
    }
}

const saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenModel.findOne({user: userId});

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }  
    const token = await TokenModel.create({user: userId, refreshToken});
    return token;        

}


module.exports = {
    saveToken,
    generateTokens
}