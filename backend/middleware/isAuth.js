const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token) {
            return res.status(401).json({error: 'Wrong credentials'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Must be authenticated"})
    }
}