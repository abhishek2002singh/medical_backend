const express = require('express');
const router = express.Router();
const VideoSession = require('../models/VideoSession');

router.post('/start-session', async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const session = new VideoSession({ appointmentId });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error starting video session" });
  }
});

module.exports = router;