const mongoose = require('mongoose');

const videoSessionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
});

module.exports = mongoose.model('VideoSession', videoSessionSchema);