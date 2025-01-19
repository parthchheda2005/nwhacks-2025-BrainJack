function GameOver({ loser }) {
  return (
    <div className="flex items-center justify-center h-screen">
      {loser === "player" ? "you lose" : loser === "tie" ? "tie" : "you win"}
    </div>
  );
}

export default GameOver;
