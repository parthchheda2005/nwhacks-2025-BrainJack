import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  const [top100, setTop100] = useState([]);

  useEffect(() => {
    const getTop100 = async () => {
      try {
        const res = await fetch(
          "https://nwhacks-2025-brainjack.onrender.com/score/v1/getTopScores",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setTop100(data.data);
      } catch (e) {
        console.error("Something went wrong fetching scores");
      }
    };

    getTop100();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="container mx-auto px-4">
        <h1 className="my-20 font-bold text-5xl text-center">Leaderboard</h1>
        <div className="overflow-x-auto">
          {/* Wrapper to set fixed height and vertical scrolling */}
          <div className="h-96 overflow-y-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Rank
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Player
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {top100.map((player, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-800 text-white"
                        : "bg-gray-700 text-white"
                    }
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default Leaderboard;
