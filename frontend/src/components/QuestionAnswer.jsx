import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionAnswer({
  bettingAmount,
  setBettingAmount,
  balance,
  setBalance,
}) {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/questions/v1/getAllQuestions"
        );
        const data = await res.json();

        // Select a random question
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const selectedQuestion = data.data[randomIndex];
        setRandomQuestion(selectedQuestion);

        // Shuffle answers for the selected question
        shuffleAnswers(selectedQuestion);
      } catch (e) {
        console.error(e);
      }
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0 && !selectedAnswer) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !selectedAnswer) {
      setIsTimeUp(true);
    }
  }, [timer, selectedAnswer]);

  const shuffleAnswers = (question) => {
    if (!question) return;
    const answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5); // Shuffle answers
    setShuffledAnswers(answers);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === randomQuestion.correct_answer) {
      setBalance((curr) => curr + bettingAmount);
    }
    setIsAnswerCorrect(answer === randomQuestion.correct_answer);
  };

  const handleEndGame = () => {
    setBettingAmount(0);
    navigate("/place-bets"); // Navigate to '/place-bets'
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
                  ? "Correct! 🎉 You get your money back!"
                  : `Incorrect! The correct answer was "${randomQuestion.correct_answer}".`}
              </p>
              <p
                className={`text-lg font-semibold ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                Balance: {`${balance}`}
              </p>
              <button
                onClick={handleEndGame}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Place your bets
              </button>
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
                Go back and place your bet
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

export default QuestionAnswer;
