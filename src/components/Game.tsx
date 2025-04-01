import React, { useState } from "react";
import Board from "./Board";
import "../styles/App.css";

type Player = "X" | "O";

const calculateWinner = (squares: ("X" | "O" | null)[]): { winner: Player | null; line: number[] } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line: [a, b, c] };
    }
  }

  return { winner: null, line: [] };
};

const Game: React.FC = () => {
  const [squares, setSquares] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState<Record<Player, number>>({ X: 0, O: 0 });
  
  const { winner, line } = calculateWinner(squares);

  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  React.useEffect(() => {
    if (winner) {
      setScore(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
  }, [winner]);

  const getStatusMessage = () => {
    if (winner) {
      return `🎉 ${winner} Wins!`;
    }
    if (!squares.includes(null)) {
      return "🤝 It's a Draw!";
    }
    return `Next Player: ${isXNext ? "X" : "O"}`;
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="score-board">
        <div className="score-item">
          <span className="player">X</span>
          <span className="score">{score.X}</span>
        </div>
        <div className="score-item">
          <span className="player">O</span>
          <span className="score">{score.O}</span>
        </div>
      </div>
      <Board squares={squares} onClick={handleClick} winningSquares={line} />
      <h2>{getStatusMessage()}</h2>
      <button className="restart" onClick={restartGame}>Restart</button>
    </div>
  );
};

export default Game;
