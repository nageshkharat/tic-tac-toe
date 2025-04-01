import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onClick: (index: number) => void;
  winningSquares: number[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningSquares }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinning={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
