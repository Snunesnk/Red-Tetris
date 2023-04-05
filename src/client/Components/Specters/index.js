import React from "react";
import { useSelector } from "react-redux";
import { CellComponent } from "../Cell/index";
import { GridContainer, PlayerPseudo, SpectersContainers } from "./styles";
import {
  INNER_TETRIS_COLORS,
  OUTER_TETRIS_COLORS,
  WHITE_COLOR,
} from "../../constants";
import { Grid } from "@mui/material";

export const SpecterComponent = ({ specters }) => {
  const players = useSelector((state) => state.appState?.room.players);

  let specterLength = specters.length;

  specters =
    specters === null
      ? null
      : specters.map((specter, i) => {
          let y_pos = -1;

          let specterMap = specter.map.map((y) => {
            y_pos++;

            let x_pos = -1;
            return y.map((x) => {
              let innerColor;
              let outerColor;

              // Only two cases here: a background cell or a specter cell
              // Background
              if (x == 0) {
                innerColor = INNER_TETRIS_COLORS[x];
                outerColor = OUTER_TETRIS_COLORS[x];
              }
              // Specter
              else {
                innerColor = WHITE_COLOR;
                outerColor = WHITE_COLOR;
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

          const player =
            players === null
              ? null
              : players.find((player) => player.socketId == specter.id);
          return (
            <Grid container>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <span style={PlayerPseudo}>{player?.name}</span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={GridContainer}>{specterMap}</div>
              </Grid>
            </Grid>
          );
        });

  return (
    <Grid container>
      {specters !== null &&
        specters.map((specter, i) => (
          <Grid
            item
            xs={specterLength - i > 1 || i % 2 == 1 ? 6 : 12}
            style={SpectersContainers}
            key={i}
          >
            {specter}
          </Grid>
        ))}
    </Grid>
  );
};
