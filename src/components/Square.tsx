import React from "react";
import "../styles/App.css";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? "winning" : ""}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
