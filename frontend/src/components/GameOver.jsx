function GameOver({ loser }) {
  return (
    <div className="flex items-center justify-center">
      {loser === "player" ? "you lose" : "you win"}
    </div>
  );
}

export default GameOver;
