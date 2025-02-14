const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  patients: [
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
