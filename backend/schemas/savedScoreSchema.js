const mongoose = require("mongoose");

const savedScoreSchema = new mongoose.Schema({
  name: { type: String },
  score: { type: Number },
});

const SavedScores = new mongoose.model("savedScores", savedScoreSchema);

module.exports = SavedScores;
