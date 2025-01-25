const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  addQuestions,
  getAllQuestions,
} = require("./controllers/questionController.js");
const {
  storeScore,
  getTopScores,
} = require("./controllers/savedScoreController.js");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.DB_CONN;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connection successful"));

app.post("/questions/v1/addQuestions", addQuestions);
app.get("/questions/v1/getAllQuestions", getAllQuestions);
app.post("/score/v1/storeScore", storeScore);
app.get("/score/v1/getTopScores", getTopScores);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
