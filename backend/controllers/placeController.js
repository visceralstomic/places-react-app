const PlaceModel = require("../models/placeModel");


const getAllPlaces = (req, res, next) => {
    const {name, location, description, sort, numericFilters} = req.query;
    const {user} = req;

    const queryObj = {};


    if (name) {
        queryObj.name = {$regex: name, $options: 'i'}
    }


    if (location) {
        queryObj.location = {$regex: location, $options: 'i'}
    }

    if (description) {
        queryObj.description = {$regex: description, $options: 'i'}
    }

    if (numericFilters) {
        const operators = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq"
        }

        const options = ['rating'];
        const reg = /\b(<|<=|=|>=|>)\b/g;

        const filters = numericFilters.replace(
            reg, 
            match => `-${operators[match]}-`
        )
        
        console.log(filters)

        filters.split(',').forEach(filter => {
            const [field, operator, value] = filter.split('-');
            if (options.includes(field)) {
                queryObj[field] = {[operator]: value}
            }
        });
    }

    let resultedList = PlaceModel.find({creator: user.uid, ...queryObj});
    const countPromise = PlaceModel.countDocuments({creator: user.uid});

    if (sort) {
        const sortParams = sort.split(',').join(' ');
        resultedList = resultedList.sort(sortParams);
    } else {
        resultedList = resultedList.sort('-createdAt');
    }

    const itemsPerPage = 2

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || itemsPerPage;
    const skip = (page - 1) * limit;

    resultedList = resultedList.skip(skip).limit(limit);

    Promise.all([countPromise, resultedList])
        .then(data => {
            res.status(200).json({places: data[1], generalNumberOfItems: data[0]})
        })
        .catch(error => next(error));
}
 


const getPlaceItem = (req, res, next) => {
    PlaceModel
        .findOne({_id: req.params.id, creator: req.user.uid})
        .then(place => {
            res.status(200).json({place})
        })
        .catch(error => next(error));
}



const createPlace = (req, res, next) => {
    const placeData = req.body;
    placeData['creator'] = req.user.uid;
    console.log(req.file)
    if (req.file) {
        placeData['picture'] = req.file.filename
    }

    const placeObj = new PlaceModel(placeData);
    placeObj
        .save()
        .then(place => {
            res.status(201).json({place})
        })
        .catch( error => next(error))
}



const deletePlace = (req, res, next) => {
    PlaceModel
        .findOneAndDelete({_id: req.params.id, creator: req.user.uid})
        .then(() => {
            res.status(204).json()
        })
        .catch(error => next(error));
}



const updatePlace = (req, res, next) => {
    const placeData = req.body;

    if (req.file) {
        placeData['picture'] = req.file.filename
    }


    PlaceModel
        .findOneAndUpdate(
            {_id: req.params.id, creator: req.user.uid}, 
            placeData, {new: true, runValidators: true})
        .then(place => {
            res.status(200).json({place})
        })
        .catch(error => next(error));
}



module.exports = {
    getAllPlaces,
    getPlaceItem,
    createPlace,
    deletePlace,
    updatePlace
}


