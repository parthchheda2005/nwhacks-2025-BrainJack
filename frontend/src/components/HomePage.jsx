import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="font-bold text-6xl">Blackjack!</h1>
      <button
        className="bg-[#a2b288] px-2 py-3 rounded-lg m-8 w-80 text-xl"
        onClick={() => navigate("/place-bets")}
      >
        Play Game!
      </button>
    </div>
  );
}

export default HomePage;
