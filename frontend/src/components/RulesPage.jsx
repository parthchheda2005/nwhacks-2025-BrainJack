import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="container mx-auto px-4">
        <h1 className="my-20 font-bold text-5xl text-center">How to play?</h1>
        <ul className="list-decimal text-2xl space-y-4">
          <li>Place a bet!</li>
          <li>
            Play a game of blackjack! In this version, Ace is strictly 11 for
            simplicity.
          </li>
          <li>
            If you lose the game, answer a trivia question to get your money
            back!
          </li>
          <li>
            If you win, you must answer at least 1 trivia question. If you get
            the question wrong, you lose your winnings. If you win however, you
            get double your winnings. You can choose to keep going double or
            nothing and answer more trivia questions.
          </li>
        </ul>
      </div>
      <button
        className="bg-[#8a647f] px-2 py-3 rounded-lg m-5 w-80 text-xl"
        onClick={() => navigate("/")}
      >
        Back to Menu
      </button>
    </div>
  );
}

export default RulesPage;
