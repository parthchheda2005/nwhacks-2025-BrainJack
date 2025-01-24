const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String },
  difficulty: { type: String },
  category: { type: String },
  question: { type: String },
  correct_answer: { type: String },
  incorrect_answers: [{ type: String }],
});

const Questions = new mongoose.model("questions", questionSchema);

module.exports = Questions;
