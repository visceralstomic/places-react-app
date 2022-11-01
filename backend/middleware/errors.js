module.exports = function(error, req, res, next) {

    console.log(error)

    switch (error.name) {
        case "CastError":
            return res.status(400).json({errors: "Wrong id"});
        case "ValidationError":
            const errorData = Object.values(error.errors).map(item => item.message);
            return res.status(400).json({errors: errorData});
        case "MongoServerError":
            let mongoErrorData = [];
            if (error.code === 11000) {
                mongoErrorData = Object.keys(error.keyValue).map(key => `${key} must be unique`);
            }
            
            return res.status(400).json({errors: mongoErrorData});
        case "JsonWebTokenError":
            return res.status(401).json({errors: 'invalid token'})
    }
    
    next(error)
}