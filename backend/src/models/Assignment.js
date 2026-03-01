const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

const tableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },

  schema: [columnSchema],

  sampleData: [mongoose.Schema.Types.Mixed]
});

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String },
  question: { type: String },

  tables: [tableSchema],

  expectedColumns: [String]
});

module.exports = mongoose.model('Assignment', assignmentSchema);