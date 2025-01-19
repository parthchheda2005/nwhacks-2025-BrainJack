import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import PlaceBets from "./components/PlaceBets";
import GamePage from "./components/GamePage";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
