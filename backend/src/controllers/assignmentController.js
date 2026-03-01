const Assignment = require('../models/Assignment');

const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find({}, '-__v'); // exclude __v
    res.json({ success: true, data: assignments });
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id, '-__v');
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    res.json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
};