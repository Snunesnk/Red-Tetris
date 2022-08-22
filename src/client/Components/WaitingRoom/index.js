import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

import {
  GridContainerStyle,
  PlayButtonStyle,
  CenteredContainer,
  PlayersHeaderPaperStyle,
  PlayersPaperStyle,
  HostPlayersPaperStyle,
  HeaderPaperContainer,
  HeaderSpanContainer,
  ModerationActionsStyle,
  ModerationButtonStyle,
  NamePlayerPaperStyle,
  DialogBtnContainerStyle,
  ShareLinkButton,
} from "./styles";
import { RED_COLOR } from "../../constants";

export const WaitingRoomComponent = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.appState);
  const { room, socketId } = useSelector((state) => state.appState);
  const HOST_TEXT = `This player will be the new game host and you'll lose your admins rights.`;
  const KICK_TEXT = `This player will be kick out of the game.`;

  location.href = "#" + room.name + "[" + appState.playerName + "]";
  console.info(location);

  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [concernedPlayer, setConcernedPlayer] = useState({});
  const [host, setHost] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(
    () => {
      setHost(room.players[0].socketId === socketId);
    },
    [room],
    []
  );

  return (
    <Grid container style={GridContainerStyle}>
      <Grid item xs={1} md={3}></Grid>
      <Grid item xs={10} md={6} style={HeaderPaperContainer}>
        <Paper style={PlayersHeaderPaperStyle}>
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} style={CenteredContainer}>
              {room.name}
            </Grid>
            <Grid item xs={4} style={HeaderSpanContainer}>
              {room.players.length}/8
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={1} md={3}></Grid>

      <Grid item xs={1} md={3}></Grid>
      <Grid item xs={10} md={6}>
        <Grid container style={CenteredContainer}>
          <Grid item xs={8}>
            {room.players.map((player, i) => (
              <Paper
                style={i == 0 ? HostPlayersPaperStyle : PlayersPaperStyle}
                key={i}
              >
                <span style={NamePlayerPaperStyle}>{player.name}</span>
                {host && i != 0 && (
                  <span style={ModerationActionsStyle}>
                    <Button
                      onClick={() => {
                        setDialogText(HOST_TEXT);
                        setConcernedPlayer(player);
                        handleClickOpen();
                      }}
                      style={ModerationButtonStyle}
                    >
                      <StarIcon sx={{ color: "gold", fontSize: 25 }}></StarIcon>
                    </Button>
                    <Button
                      onClick={() => {
                        setDialogText(KICK_TEXT);
                        setConcernedPlayer(player);
                        handleClickOpen();
                      }}
                      style={ModerationButtonStyle}
                    >
                      <CloseIcon
                        sx={{ color: RED_COLOR, fontSize: 25 }}
                      ></CloseIcon>
                    </Button>
                  </span>
                )}
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} md={3}></Grid>

      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4} style={CenteredContainer}>
        <Button
          variant="contained"
          style={ShareLinkButton}
          size="large"
          fullWidth
          onClick={() => {
            navigator.clipboard.writeText(location.href.split("[")[0]);
          }}
        >
          Copy sharing link
        </Button>
      </Grid>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={1} md={3}></Grid>
      <Grid item xs={10} md={6} style={CenteredContainer}>
        <Button
          variant="contained"
          style={PlayButtonStyle}
          size="large"
          fullWidth
          onClick={() => {
            dispatch({
              type: "game:start",
              roomName: appState.roomName,
              playerName: appState.playerName,
            });
          }}
          disabled={!host}
        >
          {host ? "Start" : "Waiting for host"}
        </Button>
      </Grid>
      <Grid item xs={1} md={3}></Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={DialogBtnContainerStyle}>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              if (dialogText === KICK_TEXT)
                dispatch({
                  type: "game:kickPlayer",
                  playerId: concernedPlayer?.socketId,
                });
              else if (dialogText === HOST_TEXT) {
                dispatch({
                  type: "game:hostPlayer",
                  playerId: concernedPlayer?.socketId,
                });
              }
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
