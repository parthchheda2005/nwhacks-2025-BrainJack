const client = require("../db/postgres");

exports.getTopScores = async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM score ORDER BY score DESC LIMIT 100"
    );
    const topScores = result.rows;
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
    const result = await client.query(
      "SELECT id FROM score ORDER BY id DESC LIMIT 1"
    );
    const new_id = result.rows.length > 0 ? result.rows[0].id + 1 : 1;

    const query = await client.query(
      `INSERT INTO score (id, name, score) VALUES ($1, $2, $3)`,
      [new_id, name, parseInt(score)]
    );
    res.status(201).json({
      status: "success",
      data: { name, score },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error storing score: ${error.message}`,
    });
  }
};
