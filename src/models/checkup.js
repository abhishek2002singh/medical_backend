const mongoose = require('mongoose');

const checkup = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    firstName: {
        type:String,
        required: true,
        index:true,
        minlength:2,
        maxlenght:50,
        
    },
    lastName:{
        type : String,
        required: true,
        index:true,
    },
    age: {
        type: Number,
        min: 18,

    },
    gender: {
        type : String,
        
    },
    refDoctor: {
        type: String,
        required: true
    },
    scanningPart: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    }
},{timestamps:true,});

module.exports = mongoose.model('CheckUp', checkup);

