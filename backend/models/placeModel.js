const mongoose = require('mongoose');



const placeShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
        maxlength: [100, "Max name length is 50"],
        minlength: [2, "Min name length is 2"],
        trim: true
    },
    location:{
        type: String,
        required: [true, "Provide location"],
        maxlength: [100, "Max location length is 50"],
        minlength: [2, "Min location length is 2"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Provide description"],
        minlength: [15, "Min location length is 15"],
        trim: true
    },
    picture:{
        type: String
    },
    rating: {
        type: Number,
        default: 0,
        max: [5, "Rating can't be bigger than 5"],
        min: [0, "Rating can't be smaller than zero"]
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    }
}, {timestamps: true});





module.exports = mongoose.model('Place', placeShema);

