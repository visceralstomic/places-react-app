const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide username"],
        maxlength: [30, "Max username length is 30"],
        minlength: [3, "Min username length is 3"]
    },
    password: {
        type: String,
        required: [true, "Provide password"],
        maxlength: [80, "Max password length is 80"],
        minlength: [10, "Min password length is 10"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Provide valid email"
        ],
        unique: true
    }
})


userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.createToken = function() {
    return jwt.sign({
            uid: this._id,
            username: this.username     
        },
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        })
}


userSchema.methods.comparePasswords = async function (password) {
    const isMatch =  await bcrypt.compare(password, this.password);
    return isMatch; 
} 

module.exports = mongoose.model("User", userSchema);
