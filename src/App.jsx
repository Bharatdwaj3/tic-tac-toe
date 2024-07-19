import Boadr from "./components/Board";
import Cell from "./components/Cell";
import { useState, useEffect } from "react";

const defaultSquares = () => (new Array(9)).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn =squares.filter((square) => square !== null).length % 2 === 1;
    const linesThatAre = (a, b, c) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val != null);

    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const ComputerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon) {
     setWinner("x");
    }
    if (ComputerWon) {
     setWinner("o");
    }
    const putComputerAt = (index) => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const LinesToBlock = linesThatAre("x", "x", null);
      if (LinesToBlock.length > 0) {
        const blockIndex = LinesToBlock[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        linesToContinue[0].filter((index) => squares[index] === null)[0];
        return;
      }
      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
    }
  }, [squares]);

  function handleSquareClick(index) {
    const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = "x";
      setSquares([...newSquares]);
    }
  }

  return (
    <>
      <Boadr>
        {squares.map((square, index) => (
          <Cell
            x={square === "x" ? 1 : 0}
            o={square === "o" ? 1 : 0}
            key={index}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </Boadr>
      {!!winner && winner === "x" && (
        <div className="bg-red-500 h-36 w-full">You WON!</div>
      )}
      {!!winner && winner === "o" && (
        <div className="bg-green-500 h-36 w-full">You LOST!</div>
      )}
    </>
  );
}

export default App;
