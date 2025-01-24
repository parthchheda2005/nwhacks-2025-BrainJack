const Questions = require("../schemas/questionSchema.js");
const { fetchTriviaQuestions } = require("../stealQuestions.js");

exports.addQuestions = async (req, res) => {
  try {
    const questions = await fetchTriviaQuestions();
    await Promise.all(questions.map((question) => Questions.create(question)));
    res.status(201).json({
      status: "success",
      data: questions,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "Failed to add questions",
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    res.status(200).json({
      status: "success",
      data: questions,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve questions",
    });
  }
};
