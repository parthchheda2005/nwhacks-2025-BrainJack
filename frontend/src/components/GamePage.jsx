import React, { useState } from "react";

const BlackjackLayout = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  return (
    <div className="h-screen flex flex-col">
      {/* Top container (Dealer) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex justify-center items-center relative">
          {/* Card in center */}
          <div className="flex justify-center items-center">
            <img
              src="https://github.com/hanhaechi/playing-cards/blob/master/clubs_10.png?raw=true"
              alt="10 club"
            />
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
            <button className="bg-red-600 text-white px-2 py-3 rounded-lg">
              Hit
            </button>
            <button className="bg-green-600 text-white px-2 py-3 rounded-lg">
              Double
            </button>
            <button className="bg-blue-600 text-white px-2 py-3 rounded-lg">
              Stand
            </button>
            <button className="bg-purple-600 text-white px-2 py-3 rounded-lg">
              Split
            </button>
          </div>

          {/* Middle side */}
          <img
            src="https://github.com/hanhaechi/playing-cards/blob/master/clubs_10.png?raw=true"
            alt="10 club"
            className="ml-20"
          />

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

export default BlackjackLayout;
