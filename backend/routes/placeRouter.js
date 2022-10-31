const express = require('express');
const {v4: uuidv4} = require("uuid");
const placeController = require("../controllers/placeController");
const isCreator = require("../middleware/isCreator")
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, "../public", "images", "places"))
    },
    filename: function(req, file, cb) {
        cb(null, `${uuidv4()}-${file.originalname}`)
    }
})


const upload = multer({ storage: storage})


const router = express.Router();


router
    .route("/")
    .get(placeController.getAllPlaces)
    .post(upload.single('picture'), placeController.createPlace);


router
    .route("/:id")
    .get(isCreator, placeController.getPlaceItem)
    .patch(isCreator, upload.single('picture'), placeController.updatePlace)
    .delete(isCreator,placeController.deletePlace);


module.exports = router;