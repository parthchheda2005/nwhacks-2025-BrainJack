import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WinningsMultiplier({
  bettingAmount,
  setBettingAmount,
  balance,
  setBalance,
}) {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timer, setTimer] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !selectedAnswer && isTimerRunning) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && !selectedAnswer) {
      setIsTimeUp(true);
      setIsTimerRunning(false);
    }
    return () => clearTimeout(countdown);
  }, [timer, selectedAnswer, isTimerRunning]);

  const fetchNewQuestion = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/questions/v1/getAllQuestions"
      );
      const data = await res.json();

      const randomIndex = Math.floor(Math.random() * data.data.length);
      const selectedQuestion = data.data[randomIndex];
      setRandomQuestion(selectedQuestion);

      shuffleAnswers(selectedQuestion);
      resetRoundState();
    } catch (e) {
      console.error(e);
    }
  };

  const shuffleAnswers = (question) => {
    if (!question) return;
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setShuffledAnswers(answers);
  };

  const resetRoundState = () => {
    setTimer(10);
    setSelectedAnswer(null);
    setIsTimeUp(false);
    setIsAnswerCorrect(null);
    setIsTimerRunning(true);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsTimerRunning(false);
    const correct = answer === randomQuestion.correct_answer;
    setIsAnswerCorrect(correct);

    if (correct) {
      // Triple the betting amount and update balance
      const newBettingAmount = bettingAmount * 3;
      setBettingAmount(newBettingAmount);
      setBalance((curr) => curr + newBettingAmount);
    }
  };

  const handleNextQuestion = () => {
    fetchNewQuestion();
  };

  const handleEndGame = () => {
    setBettingAmount(0);
    navigate("/place-bets");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-7">
        🎲💰💸 GET YOUR MONEY BACK FROM THE HOUSE 🎲💰💸
      </h1>
      {randomQuestion ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-4">Quiz Game</h1>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              {randomQuestion.question}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Time Remaining: <span className="font-bold">{timer}</span> seconds
            </p>
          </div>
          <div className="space-y-3">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={!!selectedAnswer || isTimeUp}
                className={`w-full py-2 px-4 text-left rounded-lg border-2 ${
                  selectedAnswer || isTimeUp
                    ? answer === randomQuestion.correct_answer
                      ? "border-green-500 bg-green-100"
                      : answer === selectedAnswer
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300 bg-gray-50"
                    : "border-gray-300 hover:bg-gray-100"
                } transition duration-200 text-gray-500`}
              >
                {answer}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className="mt-6 text-center">
              <p
                className={`text-lg font-semibold ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAnswerCorrect
                  ? "Correct! 🎉 Your betting amount has been tripled!"
                  : `Incorrect! The correct answer was "${randomQuestion.correct_answer}".`}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Current Betting Amount: ${bettingAmount}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Balance: ${balance}
              </p>
              {isAnswerCorrect ? (
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleEndGame}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Place New Bet
                </button>
              )}
            </div>
          )}
          {isTimeUp && !selectedAnswer && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-red-600">
                Time's up! You lost this round. The correct answer was "
                {randomQuestion.correct_answer}".
              </p>
              <button
                onClick={handleEndGame}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Place New Bet
              </button>
            </div>
          )}
        </div>
      ) : (
        <h2 className="text-xl font-semibold text-gray-700">
          Loading questions...
        </h2>
      )}
    </div>
  );
}

export default WinningsMultiplier;
