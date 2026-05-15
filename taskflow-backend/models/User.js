const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        uniqe: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        uniqe: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("User",UserSchema);