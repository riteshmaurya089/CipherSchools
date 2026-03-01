const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    query: { type: String, required: true },
    result: { type: mongoose.Schema.Types.Mixed },
    success: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attempt', AttemptSchema);