import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import PlaceBets from "./components/PlaceBets";
import GamePage from "./components/GamePage";
import QuestionAnswer from "./components/QuestionAnswer";
import WinningsMultiplier from "./components/WinningsMultiplier";
import RulesPage from "./components/RulesPage";
import Leaderboard from "./components/Leaderboard";

export const AppContext = createContext();

function App() {
  const [loser, setLoser] = useState("");
  const [bettingAmount, setBettingAmount] = useState(0);
  const [balance, setBalance] = useState(1000);

  return (
    <AppContext.Provider
      value={{
        loser,
        setLoser,
        bettingAmount,
        setBettingAmount,
        balance,
        setBalance,
      }}
    >
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/place-bets" element={<PlaceBets />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/get-your-money-back" element={<QuestionAnswer />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route
              path="/multiply-your-winnings"
              element={<WinningsMultiplier />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
