import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlaceBets({ balance, setBalance, bettingAmount, setBettingAmount }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const saveScore = async () => {
    try {
      await fetch("http://127.0.0.1:8000/score/v1/storeScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          score: balance,
        }),
      });
      setBalance(1000);
      setBettingAmount(0);
      setName("");
    } catch (e) {
      console.error("Something went wrong saving score");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="my-20 font-bold text-5xl">Place your bets!</h1>
      <div className="flex flex-row justify-evenly items-center">
        <div className="flex flex-col items-center justify-center mx-6">
          <button
            onClick={() => {
              if (balance - 10 >= 0) {
                setBettingAmount(bettingAmount + 10);
                setBalance(balance - 10);
              }
            }}
          >
            <img
              src="https://www.jacquelynmarcella.com/blackjack/img/10-chip.png"
              className="h-36 mb-3"
              alt="Poker Chip"
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mx-6">
          <button
            onClick={() => {
              if (balance - 25 >= 0) {
                setBettingAmount(bettingAmount + 25);
                setBalance(balance - 25);
              }
            }}
          >
            <img
              src="
              https://www.jacquelynmarcella.com/blackjack/img/25-chip.png"
              className="h-36 mb-3"
              alt="Poker Chip"
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mx-6">
          <button
            onClick={() => {
              if (balance - 50 >= 0) {
                setBettingAmount(bettingAmount + 50);
                setBalance(balance - 50);
              }
            }}
          >
            <img
              src="
              https://www.jacquelynmarcella.com/blackjack/img/50-chip.png"
              className="h-36 mb-3"
              alt="Poker Chip"
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mx-6">
          <button
            onClick={() => {
              if (balance - 100 >= 0) {
                setBettingAmount(bettingAmount + 100);
                setBalance(balance - 100);
              }
            }}
          >
            <img
              src="
              https://www.jacquelynmarcella.com/blackjack/img/100-chip.png"
              className="h-36 mb-3"
              alt="Poker Chip"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center my-14">
        <p className="font-semibold text-xl">
          Current Betting Amount: {bettingAmount}
        </p>
        <p className="font-semibold text-xl">Balance: {balance}</p>
        <button
          className="bg-[#b29588] px-2 py-3 rounded-lg w-52 my-3"
          onClick={() => {
            setBalance(1000);
            setBettingAmount(0);
          }}
        >
          Reset Betting Amount
        </button>
        <button
          className="bg-[#a2b288] px-2 py-3 rounded-lg w-52 mb-3"
          onClick={() => navigate("/game")}
        >
          Play Game
        </button>
        <div className="flex flex-row items-center justify-center gap-5 mb-3">
          <input
            className="px-2 py-3 rounded-lg border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button
            className="bg-[#88a2b2] px-2 py-3 rounded-lg w-52"
            onClick={() => saveScore()}
          >
            Save your score in the leaderboard!
          </button>
        </div>
        <button
          className="bg-[#8a647f] px-2 py-3 rounded-lg w-52"
          onClick={() => navigate("/")}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default PlaceBets;
