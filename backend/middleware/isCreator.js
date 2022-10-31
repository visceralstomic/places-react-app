const PlaceModel = require("../models/placeModel");




module.exports = function(req, res, next) {
    PlaceModel
        .findOne({_id: req.params.id})
        .then(place => {
            if(!place.creator.equals(req.user.uid)) {
                return res.status(403).json({errors: "Access forbidden"})
            }
            next()
        })
        .catch(error => next(error))
}