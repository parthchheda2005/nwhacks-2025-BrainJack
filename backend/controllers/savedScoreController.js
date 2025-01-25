const SavedScores = require("../schemas/savedScoreSchema.js");

exports.getTopScores = async (req, res) => {
  try {
    const topScores = await SavedScores.find().sort({ score: -1 }).limit(100);
    res.status(200).json({
      status: "success",
      data: topScores,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Failed to get top 100 scores",
    });
  }
};

exports.storeScore = async (req, res) => {
  try {
    const { name, score } = req.body;
    const newScore = new SavedScores({ name, score });
    const savedScore = await newScore.save();
    res.status(201).json({
      status: "success",
      data: savedScore,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error storing score: ${error.message}`,
    });
  }
};
