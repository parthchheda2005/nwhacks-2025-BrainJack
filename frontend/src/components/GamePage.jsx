import React, { useEffect, useState } from "react";
import deck from "./deck";

const GamePage = ({ loser, setLoser }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

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

  useEffect(() => {
    const checkPlayerScore = () => {
      if (playerScore > 21) {
        setLoser("player");
        showGameOver();
      }
    };
    setTimeout(checkPlayerScore, 1000);
  }, [playerScore]);

  const showGameOver = () => {
    setIsGameOver(true);
  };

  const hit = (e) => {
    e.preventDefault();
    const drawnCard = drawCards(currDeck, 1);
    setPlayerHand((curr) => [...curr, drawnCard[0]]);
  };

  const stand = (e) => {
    e.preventDefault();

    const dealerTurn = (currentScore) => {
      if (currentScore >= 17) {
        if (currentScore > 21 || currentScore < playerScore) {
          setLoser("dealer");
          setTimeout(showGameOver, 1000);
        } else if (currentScore > playerScore) {
          setLoser("player");
          setTimeout(showGameOver, 1000);
        } else {
          setLoser("tie");
          setTimeout(showGameOver, 1000);
        }
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

  const double = (e) => {
    e.preventDefault();
    hit(e);
    setTimeout(() => stand(e), 1000);
  };

  const playAgain = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Game Over Screen */}
      <div
        className={`absolute inset-0 bg-black/90 flex flex-col items-center justify-center transform transition-transform duration-700 ease-in-out ${
          isGameOver ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-8">Game Over</h1>
          <p className="text-3xl mb-8">
            {loser === "dealer" && "You Win! 🎉"}
            {loser === "player" && "Dealer Wins! 😢"}
            {loser === "tie" && "It's a Tie! 🤝"}
          </p>
          <div className="text-2xl mb-8">
            <p>Your Score: {playerScore}</p>
            <p>Dealer Score: {dealerScore}</p>
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
      <div className="flex-1 flex items-center justify-center">
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
