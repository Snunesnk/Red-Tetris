import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BoardContainer,
  GridContainer,
  GameContainer,
  BoardContainerStyle,
} from "./styles";
import { CellComponent } from "../Cell/index";
import {
  OUTER_TETRIS_COLORS,
  INNER_TETRIS_COLORS,
  WHITE_COLOR,
} from "../../constants";
import { BoardModalComponent } from "../BoardModal/index";
import { BoardInfosComponent } from "../BoardInfos";
import { BoardHoldComponent } from "../BoardHold";
import { SpecterComponent } from "../Specters";
import { Grid } from "@mui/material";
import BoardClock from "../BoardClock";

export const BoardComponent = () => {
  const appState = useSelector((state) => state.appState);
  const stateBoard = useSelector((state) => state.stateBoard);
  let specters = useSelector((state) => state.appState?.specters);
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [clockStart, setClockStart] = useState(false);
  const dispatch = useDispatch();
  let y_pos = -1;

  const timer = localStorage.getItem("gameDuration");

  const spanStyle = {
    color:
      OUTER_TETRIS_COLORS[stateBoard.level - (1 % OUTER_TETRIS_COLORS.length)],
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "1em",
  };

  const board = stateBoard.board.map((y) => {
    y_pos++;

    let x_pos = -1;
    return y.map((x) => {
      let innerColor;
      let outerColor;

      // Handle specter
      if (x > 7) {
        innerColor = INNER_TETRIS_COLORS[0];
        outerColor = OUTER_TETRIS_COLORS[x - 7];
      }
      // Handle unbreakable lines
      else if (x == -1) {
        innerColor = "rgb(234, 14, 14)";
        outerColor = "#000000";
      } else {
        innerColor = INNER_TETRIS_COLORS[+x];
        outerColor = OUTER_TETRIS_COLORS[+x];
      }
      x_pos++;

      return (
        <CellComponent
          key={"cell_" + y_pos + "_" + x_pos}
          x_pos={x_pos}
          y_pos={y_pos}
          inner_color={innerColor}
          outer_color={outerColor}
        />
      );
    });
  });

  const color =
    stateBoard.level == 0 || stateBoard.level == 1
      ? "white"
      : OUTER_TETRIS_COLORS[
          stateBoard.level - (1 % OUTER_TETRIS_COLORS.length)
        ];

  useEffect(() => {
    const baseTime = 1000;

    setTimeout(() => {
      setMessage("Ready ?");
    }, baseTime);
    setTimeout(() => {
      setMessage("Steady ?");
    }, baseTime * 2);
    setTimeout(() => {
      setMessage("Go !!");
    }, baseTime * 3);
    setTimeout(() => {
      setOpen(false);
      setClockStart(true);
      dispatch({ type: "game:tetrisStart" });
    }, baseTime * 4);
  }, []);

  return (
    <Grid container style={BoardContainer}>
      <BoardModalComponent open={open} message={message} />

      {/* {specters !== null && specters.length > 0 && (
        <Grid item xs={3}>
          {/* Even specters 
          <SpecterComponent
            specters={specters.filter((specter, i) => i % 2 == 0)}
          />
        </Grid>
      )} */}

      <Grid item xs={12} xl={6}>
        <div id="game-container" style={GameContainer}>
          <Grid item style={BoardContainerStyle} id="board-container">
            <BoardInfosComponent score={stateBoard.score} color={color} />
            {appState.isGameQuick && timer > -1 && (
              <BoardClock color={color} clockStart={clockStart} timer={timer} />
            )}
            <div style={GridContainer}>{board}</div>
            <BoardHoldComponent color={color} />
          </Grid>
        </div>
      </Grid>

      {/* <Grid item xs={3}>
        Odd specters
        <SpecterComponent
          specters={specters.filter((specter, i) => i % 2 != 0)}
        />
      </Grid> */}
    </Grid>
  );
};
