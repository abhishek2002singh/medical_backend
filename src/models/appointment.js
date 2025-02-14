const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
        

    },
    gender: {
        type : String,
        
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to Doctor model
        
      },
    doctorName: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true,});

module.exports = mongoose.model('Appointment', appointmentSchema);

