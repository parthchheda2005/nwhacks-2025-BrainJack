import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import PlaceBets from "./components/PlaceBets";
import GamePage from "./components/GamePage";
import GameOver from "./components/GameOver";

function App() {
  const [loser, setLoser] = useState("");
  // 'dealer', 'player', ''

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/place-bets" element={<PlaceBets />} />
          <Route
            path="/game"
            element={<GamePage loser={loser} setLoser={setLoser} />}
          />
          <Route path="/game-over" element={<GameOver loser={loser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
