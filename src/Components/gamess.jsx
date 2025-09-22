import react from "react";

const Games = () => {
  // Placeholder handlers for starting games
  const startBubbleGame = () => {
    alert("Starting Pop the Cramp game... (implement game logic here)");
  };

  const startCravingGame = () => {
    alert("Starting Cravings Catch game... (implement game logic here)");
  };

  const startColorGame = () => {
    alert("Starting Relaxing Colors game... (implement game logic here)");
  };

  return (
    <div id="games" className="section">
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#7b1fa2" }}>
        🎮 Mood Boosting Games
      </h2>

      <div className="game-grid" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div
          className="game-card"
          onClick={startBubbleGame}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && startBubbleGame()}
          style={{ flex: "1 1 250px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer" }}
        >
          <h4>💖 Pop the Cramp</h4>
          <p>Pop bubbles to release stress and tension!</p>
        </div>

        <div
          className="game-card"
          onClick={startCravingGame}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && startCravingGame()}
          style={{ flex: "1 1 250px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer" }}
        >
          <h4>🍫 Cravings Catch</h4>
          <p>Catch your favorite comfort foods!</p>
        </div>

        <div
          className="game-card"
          onClick={startColorGame}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && startColorGame()}
          style={{ flex: "1 1 250px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer" }}
        >
          <h4>🌈 Relaxing Colors</h4>
          <p>Match colors for a calming experience.</p>
        </div>
      </div>

      {/* Placeholder for game area */}
      <div id="gameArea" style={{ marginTop: "30px" }}>
        {/* Game UI can be conditionally rendered here */}
      </div>
    </div>
  );
};

export default Games;
