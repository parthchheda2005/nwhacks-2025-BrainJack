import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlaceBets({ balance, setBalance, bettingAmount, setBettingAmount }) {
  const navigate = useNavigate();

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
      <div className="flex flex-col justify-evenly items-center my-20">
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
