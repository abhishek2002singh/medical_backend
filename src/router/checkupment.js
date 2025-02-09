const express = require('express');
const CheckUp = require("../models/checkup"); // Import the correct model

const checkupRouter = express.Router();
const { userAuth } = require('../middleware/auth');

// POST - Create an Appointment
checkupRouter.post('/checkup', userAuth, async (req, res) => {
    try {
        const { refDoctor, scanningPart, mobileNumber, firstName, lastName, age, gender } = req.body;
        const userId = req.accessUser._id;
        console.log( "body is"+req.body)
        console.log("here"+req.accessUser._id)

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! Please log in." });
        }

        // if (!doctorName || !disease || !mobileNumber || !firstName || !lastName || !age || !gender) {
        //     return res.status(400).json({ message: "All fields are required!" });
        // }

        const newCheckup = new CheckUp({
            userId,
            refDoctor,
            scanningPart,
            mobileNumber,
            firstName,
            lastName,
            age,
            gender
        });
        console.log("there"+newCheckup)

        await newCheckup.save();
        return res.status(201).json({ message: "Appointment booked successfully!", checkup: newCheckup });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// GET - Fetch All Appointments for Logged-in User
checkupRouter.get('/checkups', userAuth, async (req, res) => {
    try {
        const userId = req.accessUser._id;
        const checkup = await CheckUp.find({ userId });
        console.log(checkup)

        return res.status(200).json({ checkup });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = checkupRouter;
