import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";
import PlaceBets from "./components/PlaceBets";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/place-bets" element={<PlaceBets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
