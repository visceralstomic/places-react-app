require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const userRouter = require("./routes/userRouter");
const placeRouter = require("./routes/placeRouter");
const isAuth = require("./middleware/isAuth");
const errors = require("./middleware/errors");
const path = require("path");

const app = express();



app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/',express.static(path.resolve(__dirname, 'public', 'build')))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}));

app.use("/user", userRouter);
app.use("/places", isAuth, placeRouter);

app.use(errors)


const PORT = 5000;


mongoose
    .connect(process.env.MONGO_URI)
    .then(result => {
        console.log('Db connected');
        app.listen(PORT, () => {
            console.log(`server started at ${PORT}`);
        })
    })
    .catch(error => {
        console.log('Db error', error);
    });


