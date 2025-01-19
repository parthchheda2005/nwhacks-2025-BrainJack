import React, { useEffect, useState } from "react";
import deck from "./deck";
import { useNavigate } from "react-router-dom";

const imgsStackTest = [
  "https://github.com/hanhaechi/playing-cards/blob/master/clubs_10.png?raw=true",
  "https://github.com/hanhaechi/playing-cards/blob/master/diamonds_2.png?raw=true",
  "https://github.com/hanhaechi/playing-cards/blob/master/hearts_8.png?raw=true",
];

const GamePage = ({ loser, setLoser }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [checkingPlayerScore, setCheckingPlayerScore] = useState(false);

  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const [didStand, didNotStand] = useState(false);

  let currDeck = [...deck];
  const navigate = useNavigate();

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
    // Draw 2 cards for player and dealer
    const playerCards = drawCards(currDeck, 2);
    setPlayerHand(playerCards);

    const dealerCards = drawCards(currDeck, 1);
    setDealerHand(dealerCards);
  }, []);

  useEffect(() => {
    console.log(dealerHand);
    let sum = 0;
    for (let i = 0; i < dealerHand.length; i++) {
      if (dealerHand[i].value) sum += dealerHand[i].value;
    }
    setDealerScore(sum);
  }, [dealerHand]);

  useEffect(() => {
    console.log(playerHand);
    let sum = 0;
    for (let i = 0; i < playerHand.length; i++) {
      if (playerHand[i].value) sum += playerHand[i].value;
    }
    setPlayerScore(sum);
  }, [playerHand]);

  // check player score at all times
  useEffect(() => {
    const checkPlayerScore = () => {
      if (playerScore > 21) {
        setLoser("player");
        navigate("/game-over");
      }
    };
    setTimeout(checkPlayerScore, 2500);
  }, [playerScore]);

  const hit = (e) => {
    e.preventDefault();
    const drawnCard = drawCards(currDeck, 1);
    setPlayerHand((curr) => [...curr, drawnCard[0]]);
  };

  const stand = (e) => {
    e.preventDefault();

    const dealerTurn = () => {
      let newCard = drawCards(currDeck, 1)[0]; // Draw one card
      setDealerHand((prevHand) => [...prevHand, newCard]); // Add card to dealer's hand

      setDealerScore((prevScore) => {
        const updatedScore = prevScore + newCard.value;
        // Check if the dealer needs to draw more cards
        if (updatedScore < 17) {
          setTimeout(dealerTurn, 2500); // Continue the dealer's turn after 1 second
        } else {
          // End of dealer's turn: determine the winner
          if (updatedScore > 21 || updatedScore < playerScore) {
            setLoser("dealer");
            setTimeout(() => navigate("/game-over"), 3000);
          } else if (updatedScore > playerScore) {
            setLoser("player");
            setTimeout(() => navigate("/game-over"), 3000);
          } else {
            setLoser("tie");
            setTimeout(() => navigate("/game-over"), 3000);
          }
        }
        return updatedScore; // Return the updated score
      });
    };

    dealerTurn(); // Start the dealer's turn
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top container (Dealer) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex justify-center items-center relative">
          {/* Card in center */}
          <div className="flex flex-col gap-5 justify-center items-center">
            {dealerHand.map((curr) => {
              return (
                <p className="font-semibold text-lg">{`${
                  curr.emoji && curr.emoji
                }${
                  curr.face != "none"
                    ? curr.face && curr.face
                    : curr.value && curr.value
                }`}</p>
              );
            })}
          </div>
          {/* Score display positioned absolutely on the right */}
          <div className="absolute right-10 flex flex-col items-center gap-3">
            <h1 className="font-semibold text-xl">Dealer Score</h1>
            <div className="rounded-full w-16 h-16 bg-slate-500 mb-1 flex items-center justify-center text-xl">
              {dealerScore}
            </div>
          </div>
        </div>
      </div>

      {/* Dividing line */}
      <hr className="w-full border-t-2 border-gray-400" />

      {/* Bottom container (Player) */}
      <div className="flex-1 flex flex-col pt-4">
        <div className="flex flex-row justify-between w-full">
          {/* Left side (buttons) */}
          <div className="flex flex-col gap-3 ml-3">
            <button
              className="bg-red-600 text-white px-2 py-3 rounded-lg"
              onClick={(e) => hit(e)}
            >
              Hit
            </button>
            <button className="bg-green-600 text-white px-2 py-3 rounded-lg">
              Double
            </button>
            <button
              className="bg-blue-600 text-white px-2 py-3 rounded-lg"
              onClick={(e) => stand(e)}
            >
              Stand
            </button>
            <button className="bg-purple-600 text-white px-2 py-3 rounded-lg">
              Split
            </button>
          </div>

          {/* Card in center */}
          <div className="flex flex-col gap-5 justify-center items-center">
            {playerHand.map((curr) => {
              return (
                <p className="font-semibold text-lg">{`${
                  curr.emoji && curr.emoji
                }${
                  curr.face != "none"
                    ? curr.face && curr.face
                    : curr.value && curr.value
                }`}</p>
              );
            })}
          </div>

          {/* Right side */}
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
