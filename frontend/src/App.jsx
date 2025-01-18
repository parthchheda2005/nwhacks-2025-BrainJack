import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
