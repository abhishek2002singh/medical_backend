const express = require('express');
const Appointment = require("../models/appointment"); // Import the correct model

const appointmentRouter = express.Router();
const { userAuth } = require('../middleware/auth');

// POST - Create an Appointment
appointmentRouter.post('/appointment', userAuth, async (req, res) => {
    try {
        const { doctorName, disease, mobileNumber, firstName, lastName, age, gender,date } = req.body;
        const userId = req.accessUser._id;
        console.log( "body is"+req.body)
        console.log("here"+req.accessUser._id)

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        // if (!doctorName || !disease || !mobileNumber || !firstName || !lastName || !age || !gender) {
        //     return res.status(400).json({ message: "All fields are required!" });
        // }

        const newAppointment = new Appointment({
            userId,
            doctorName,
            disease,
            mobileNumber,
            firstName,
            lastName,
            age,
            gender,
            date
        });
        console.log("there"+newAppointment)

        await newAppointment.save();
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

module.exports = appointmentRouter;
