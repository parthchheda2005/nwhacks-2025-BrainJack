import React, { useEffect, useState } from "react";
import deck from "./deck";
import { useNavigate } from "react-router-dom";

const GamePage = ({ loser, setLoser, balance, setBalance, bettingAmount }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate = useNavigate();

  let currDeck = [...deck];

  const drawCards = (deck, numCards) => {
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      let randomIndex = Math.floor(Math.random() * deck.length);
      cards.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
    return cards;
  };

  useEffect(() => {
    const playerCards = drawCards(currDeck, 2);
    setPlayerHand(playerCards);

    const dealerCards = drawCards(currDeck, 1);
    setDealerHand(dealerCards);
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i].value) sum += dealerHand[i].value;
    }
    setDealerScore(sum);
  }, [dealerHand]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i].value) sum += playerHand[i].value;
    }
    setPlayerScore(sum);
  }, [playerHand]);

  const showGameOver = () => {
    if (loser === "dealer") setBalance((curr) => curr + bettingAmount);
    if (loser === "player") setBalance((curr) => curr - bettingAmount);
    setIsGameOver(true);
  };

  const hit = (e) => {
    if (e) e.preventDefault();
    let drawnCard = drawCards(currDeck, 1);
    if (playerScore < 21 && drawnCard[0].value === 11)
      drawnCard[0] = { ...drawnCard[0], value: 1 };
    setPlayerHand((curr) => [...curr, drawnCard[0]]);
    if (playerScore + drawnCard[0].value > 21) {
      setLoser("player");
      showGameOver();
    }
    if (playerScore + drawnCard[0].value === 21) {
      setLoser("dealer");
      showGameOver();
    }
  };

  const double = (e) => {
    e.preventDefault();

    let drawnCard = drawCards(currDeck, 1);
    if (playerScore < 21 && drawnCard[0].value === 11) {
      drawnCard[0] = { ...drawnCard[0], value: 1 };
    }
    const newPlayerScore = playerScore + drawnCard[0].value;
    setPlayerHand((curr) => [...curr, drawnCard[0]]);

    if (newPlayerScore > 21) {
      setLoser("player");
      showGameOver();
      return;
    }

    const dealerTurn = (currentScore) => {
      if (currentScore > 21) {
        setLoser("dealer");
        showGameOver();
        return;
      }

      if (currentScore >= 17) {
        if (currentScore === newPlayerScore) {
          setLoser("tie");
        } else if (currentScore > newPlayerScore) {
          setLoser("player");
        } else {
          setLoser("dealer");
        }
        showGameOver();
        return;
      }

      // Only draw a new card if dealer needs to hit
      const newCard = drawCards(currDeck, 1)[0];
      const updatedScore = currentScore + newCard.value;

      // Update state and schedule next turn
      setDealerHand((prevHand) => [...prevHand, newCard]);
      setDealerScore(updatedScore);

      // Give React time to update the state before next dealer action
      setTimeout(() => dealerTurn(updatedScore), 1000);
    };

    dealerTurn(dealerScore);
  };
  const stand = (e) => {
    if (e) e.preventDefault();

    const dealerTurn = (currentScore) => {
      if (currentScore >= 17) {
        if (currentScore > 21) {
          setLoser("dealer"); // Dealer busts, player wins
        } else if (currentScore === playerScore) {
          setLoser("tie"); // Equal scores
        } else if (currentScore > playerScore) {
          setLoser("player"); // Dealer has higher score, player loses
        } else {
          setLoser("dealer"); // Player has higher score, dealer loses
        }
        showGameOver();
        return;
      }

      const newCard = drawCards(currDeck, 1)[0];
      setDealerHand((prevHand) => [...prevHand, newCard]);
      const updatedScore = currentScore + newCard.value;
      setDealerScore(updatedScore);
      setTimeout(() => dealerTurn(updatedScore), 1000);
    };

    dealerTurn(dealerScore);
  };

  const playAgain = () => {
    navigate("/place-bets");
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Game Over Screen */}
      <div
        className={`absolute inset-0 bg-black/75 flex flex-col items-center justify-center transform transition-transform duration-700 ease-in-out z-50 ${
          isGameOver ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-8">
            {loser === "dealer" && "You Win! 🎉"}
            {loser === "player" && "Dealer Wins! 😢"}
            {loser === "tie" && "It's a Tie! 🤝"}
          </h1>
          <div className="text-2xl mb-8">
            <p>Your Score: {playerScore}</p>
            <p>Dealer Score: {dealerScore}</p>
            <p>Balance: {balance}</p>
          </div>
          <button
            onClick={playAgain}
            className="bg-white text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>

      {/* Top container (Dealer) */}
      <div className="flex-1 flex items-center justify-center z-0">
        <div className="w-full flex justify-center items-center relative">
          <div className="flex flex-col gap-5 justify-center items-center">
            {dealerHand.map((curr, index) => (
              <p key={index} className="font-semibold text-lg">{`${
                curr.emoji && curr.emoji
              }${
                curr.face != "none"
                  ? curr.face && curr.face
                  : curr.value && curr.value
              }`}</p>
            ))}
          </div>
          <div className="absolute right-10 flex flex-col items-center gap-3">
            <h1 className="font-semibold text-xl">Dealer Score</h1>
            <div className="rounded-full w-16 h-16 bg-slate-500 mb-1 flex items-center justify-center text-xl">
              {dealerScore}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-t-2 border-gray-400" />

      {/* Bottom container (Player) */}
      <div className="flex-1 flex flex-col pt-4">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-3 ml-3">
            <button
              className="bg-red-600 text-white px-2 py-3 rounded-lg hover:bg-red-700 transition-colors"
              onClick={hit}
            >
              Hit
            </button>
            <button
              className="bg-green-600 text-white px-2 py-3 rounded-lg hover:bg-green-700 transition-colors"
              onClick={double}
            >
              Double
            </button>
            <button
              className="bg-blue-600 text-white px-2 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={stand}
            >
              Stand
            </button>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center">
            {playerHand.map((curr, index) => (
              <p key={index} className="font-semibold text-lg">{`${
                curr.emoji && curr.emoji
              }${
                curr.face != "none"
                  ? curr.face && curr.face
                  : curr.value && curr.value
              }`}</p>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mr-12 gap-3">
            <h1 className="font-semibold text-xl">Your Score</h1>
            <div className="rounded-full w-16 h-16 bg-slate-500 mb-1 flex items-center justify-center text-xl">
              {playerScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
