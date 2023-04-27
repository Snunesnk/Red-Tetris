import React from "react";
import { useSelector } from "react-redux";
import { CenteredContainer, GridContainer, InfosContainer } from "./styles";
import {
  INNER_TETRIS_COLORS,
  OUTER_TETRIS_COLORS,
  WHITE_COLOR,
} from "../../constants";
import { CellComponent } from "../Cell";

export const BoardInfosComponent = ({ score, color }) => {
  const stateBoard = useSelector((state) => state.stateBoard);
  let y_pos = -1;

  const next_pieces = stateBoard.nextPieces.map((y) => {
    y_pos++;

    let x_pos = -1;
    return y.map((x) => {
      let innerColor;
      let outerColor;

      innerColor = INNER_TETRIS_COLORS[+x % INNER_TETRIS_COLORS.length];
      outerColor = OUTER_TETRIS_COLORS[+x % OUTER_TETRIS_COLORS.length];

      // Do not show inner color for "dead" cells
      if (x == 0) {
        innerColor = "black";
        outerColor = "black";
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

  const containerStyle = {
    border: "7px solid " + color,
    padding: "10px",
    backgroundColor: "black",
    width: "10vh",
    fontSize: "1.25vh",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  };

  return (
    <div style={InfosContainer}>
      <div style={containerStyle}>
        <div>
          <div style={CenteredContainer}>score</div>
          <div style={CenteredContainer}>
            <span style={{ color: color }}>{score}</span>
          </div>
        </div>
        <div style={{ marginTop: "2em" }}>
          <div style={CenteredContainer}>Next</div>
          <div style={CenteredContainer}>
            <div style={GridContainer}>{next_pieces}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
