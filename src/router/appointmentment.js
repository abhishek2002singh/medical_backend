const express = require('express');
const Appointment = require("../models/appointment"); // Import the correct model
const Doctor =  require("../models/doctor");
const appointmentRouter = express.Router();
const { userAuth } = require('../middleware/auth');

// POST - Create an Appointment
appointmentRouter.post('/appointment/:doctor1Id', userAuth, async (req, res) => {
    try {
        const { doctorName, disease, mobileNumber, firstName, lastName, age, gender,date } = req.body;
        const userId = req.accessUser._id;
        
        const doctor1Id = req.params.doctor1Id

        console.log(doctor1Id)

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        // if (!doctorName || !disease || !mobileNumber || !firstName || !lastName || !age || !gender) {
        //     return res.status(400).json({ message: "All fields are required!" });
        // }

        const newAppointment = new Appointment({
            userId,
            doctorId: doctor1Id,
            doctorName,
            disease,
            mobileNumber,
            firstName,
            lastName,
            age,
            gender,
            date
        });
        

        await newAppointment.save();


        const doctor = await Doctor.findById(doctor1Id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found!" });
        }


        doctor.patients.push({
            patientId: newAppointment._id, // Assuming the user is the patient
            timestamp: new Date(),
        });

        await doctor.save();


        return res.status(201).json({ message: "Appointment booked successfully!  ", appointment: newAppointment });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// GET - Fetch All Appointments for Logged-in User
appointmentRouter.get('/appointments', userAuth, async (req, res) => {
    try {
        const userId = req.accessUser._id;
        const appointments = await Appointment.find({ userId });
        console.log(appointments)

        return res.status(200).json({ appointments });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

appointmentRouter.get('/appointments/:appointmentsId' , async (req, res) => {
    try {
  
      const appointmentsId = req.params.appointmentsId;
      console.log(appointmentsId)
      const appointments = await Appointment.find({ _id: appointmentsId })
      console.log(appointments)
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors", error });
    }
  })

module.exports = appointmentRouter;
