const client = require("../db/postgres.js");
const { fetchTriviaQuestions } = require("../stealQuestions.js");

exports.addQuestions = async (req, res) => {
  try {
    const questions = await fetchTriviaQuestions();
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await client.query(
        `INSERT INTO question (id, type, category, difficulty, question, correct_answer, incorrect_answers)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          i,
          q.type,
          q.category,
          q.difficulty,
          q.question,
          q.correct_answer,
          `{${q.incorrect_answers.join(",")}}`,
        ]
      );
    }
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
    const result = await client.query(`SELECT * FROM question`);
    const questions = result.rows;
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
