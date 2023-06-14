import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Grid, Button } from "@mui/material";
import {
  ModalStyle,
  CenteredContainer,
  ModalMessage,
  ModalMessageWin,
  ScoreModalMessage,
} from "./styles";
import { STATUS } from "../../constants";

export const BoardModalComponent = ({ open, message }) => {
  const appState = useSelector((state) => state.appState);
  const [host, setHost] = useState(false);
  const { room, socketId } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const score = useSelector((state) => state.stateBoard.score);

  useEffect(
    () => {
      setHost(room?.players[0].socketId === socketId);
    },
    [room],
    []
  );

  return (
    <Modal open={open || appState.isGameOver}>
      <Box style={ModalStyle}>
        <Grid container style={CenteredContainer}>
          {!appState.isGameOver && message.length > 0 && (
            <Grid item xs={12} style={ModalMessage}>
              {message}
            </Grid>
          )}
          {appState.isGameOver && !appState.isGameWon && (
            <Grid item xs={12} style={ModalMessage}>
              Game Over :(
            </Grid>
          )}
          {appState.isGameOver && appState.isGameWon && (
            <Grid item xs={12} style={ModalMessageWin}>
              You win! :)
            </Grid>
          )}
          {(appState.isGameOver || appState.isGameWon) && (
            <Grid item xs={12} style={ScoreModalMessage}>
              Your score: {score}
            </Grid>
          )}
          {appState.isGameOver &&
            host &&
            appState.room &&
            appState.room.status === STATUS.END_GAME && (
              <Grid item xs={12} style={ModalMessage}>
                <Button
                  onClick={() => {
                    dispatch({
                      type: "game:retry",
                    });
                  }}
                >
                  Retry
                </Button>
              </Grid>
            )}
        </Grid>
      </Box>
    </Modal>
  );
};
