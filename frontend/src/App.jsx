import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import PlaceBets from "./components/PlaceBets";
import GamePage from "./components/GamePage";
import QuestionAnswer from "./components/QuestionAnswer";
import WinningsMultiplier from "./components/WinningsMultiplier";
import RulesPage from "./components/RulesPage";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [loser, setLoser] = useState("");
  // 'dealer', 'player', '', 'tie'

  const [bettingAmount, setBettingAmount] = useState(0);
  const [balance, setBalance] = useState(1000);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<Loading />} />
          <Route
            path="/place-bets"
            element={
              <PlaceBets
                bettingAmount={bettingAmount}
                balance={balance}
                setBettingAmount={setBettingAmount}
                setBalance={setBalance}
              />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/game"
            element={
              <GamePage
                loser={loser}
                setLoser={setLoser}
                bettingAmount={bettingAmount}
                balance={balance}
                setBalance={setBalance}
                setBettingAmount={setBettingAmount}
              />
            }
          />
          <Route
            path="/get-your-money-back"
            element={
              <QuestionAnswer
                bettingAmount={bettingAmount}
                balance={balance}
                setBettingAmount={setBettingAmount}
                setBalance={setBalance}
              />
            }
          />
          <Route path="/rules" element={<RulesPage />} />
          <Route
            path="/multiply-your-winnings"
            element={
              <WinningsMultiplier
                bettingAmount={bettingAmount}
                balance={balance}
                setBettingAmount={setBettingAmount}
                setBalance={setBalance}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
