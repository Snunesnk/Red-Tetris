import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Grid, Button } from "@mui/material";
import { ModalStyle, CenteredContainer, ModalMessage, ModalMessageWin } from "./styles";
import { amIHost } from "../../utils";
import { STATUS } from "../../constants";

export const BoardModalComponent = () => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const appState = useSelector((state) => state.appState);
  const host = amIHost();

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
      dispatch({ type: "game:tetrisStart" });
    }, baseTime * 4);
  }, []);

  const dispatch = useDispatch();

  return (
    <Modal
      open={open || appState.isGameOver}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* // <div style={{ display: open || appState.isGameOver ? "block" : "none" }}> */}
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
          {appState.isGameOver &&
            host &&
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
      {/* // </div> */}
    </Modal>
  );
};
