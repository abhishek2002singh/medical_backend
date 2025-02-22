const  express = require("express");
const Doctor =  require("../models/doctor");

const doctorRouter = express.Router();

// Add a Doctor
doctorRouter.post("/add-doctor", async (req, res) => {
  try {
    const { firstName, lastName, photoUrl, specialty } = req.body;
    const doctor = new Doctor({ firstName, lastName, photoUrl, specialty, patients: [] });
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully!", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
});

// Get all Doctors
doctorRouter.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find()
    res.status(200).json(doctors);
   
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

doctorRouter.get('/doctors/:doctorId' , async (req, res) => {
  try {

    const doctorId = req.params.doctorId;
   
    const doctors = await Doctor.find({ _id: doctorId })
   
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
})

module.exports = doctorRouter;
