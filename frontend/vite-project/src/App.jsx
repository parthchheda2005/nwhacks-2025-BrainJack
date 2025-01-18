import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center">
      {/* <Routes></Routes> */}
      <h1 className="font-extralight">Hello Wolrd</h1>
    </div>
  );
}

export default App;
