import React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

var moves = [];

function calculateStatus(winner, grids, nextValue) {
  return winner ? (
    <div>
      <Alert severity="success">GAME OVER WINNER: {winner}</Alert>
      {moves.length !== 0 && (
        <div style={{ marginBottom: "1rem" }}>Moves History</div>
      )}
      <Stack
        direction="row"
        justifyContent="center"
        align="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
      >
        {moves?.map((val) => (
          <div style={{ textAlign: "center" }}>
            {val[0]} moved to square {val[1] + 1}
          </div>
        ))}
      </Stack>
    </div>
  ) : grids.every(Boolean) ? (
    <div>
      <Alert severity="info">GAME DRAW</Alert>
      {moves.length !== 0 && (
        <div style={{ marginBottom: "1rem" }}>Moves History</div>
      )}
      <Stack
        direction="row"
        justifyContent="center"
        align="center"
        flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        {moves?.map((val) => (
          <div style={{ textAlign: "center" }}>
            {val[0]} moved to square {val[1] + 1}
          </div>
        ))}
      </Stack>
    </div>
  ) : (
    <div>
      <b>TURN: {nextValue}</b>
    </div>
  );
}

const calculateNextValue = (grids) => {
  //filter(Boolean) returns only not null values
  return grids.filter(Boolean).length % 2 === 0 ? "X" : "O";
};

function calculateWinner(grids) {
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCases.length; i++) {
    const [a, b, c] = winCases[i];
    if (grids[a] && grids[a] === grids[b] && grids[a] === grids[c]) {
      return grids[a];
    }
  }
  return null;
}

export default function Board() {
  const [grids, setGrids] = React.useState(Array(9).fill(null));

  const nextValue = calculateNextValue(grids);
  const winner = calculateWinner(grids);
  const status = calculateStatus(winner, grids, nextValue);

  function selectSquare(idx) {
    if (winner || grids[idx]) {
      return;
    }
    const tempGrid = [...grids];
    tempGrid[idx] = nextValue;

    moves.push([nextValue, idx]);

    setGrids(tempGrid);
    console.log(moves);
  }

  const restart = () => {
    setGrids(Array(9).fill(null));
  };

  const grid = (i) => {
    return (
      <Button
        variant="outlined"
        sx={{ width: "80px", height: "80px" }}
        onClick={() => selectSquare(i)}
      >
        {grids[i]}
      </Button>
    );
  };

  return (
    <div>
      <div style={{ margin: "1rem auto" }}>{status}</div>
      <div>
        {grid(0)}
        {grid(1)}
        {grid(2)}
      </div>
      <div>
        {grid(3)}
        {grid(4)}
        {grid(5)}
      </div>
      <div>
        {grid(6)}
        {grid(7)}
        {grid(8)}
      </div>
      <Button variant="contained" sx={{ marginTop: "2rem" }} onClick={restart}>
        RESTART
      </Button>
    </div>
  );
}
