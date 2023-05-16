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
  LinkCopiedContainer,
  LinkCopied,
} from "./styles";
import { RED_COLOR } from "../../constants";
import LinkIcon from "@mui/icons-material/Link";

const HOST_TEXT = `This player will be the new game host and you'll lose your admins rights.`;
const KICK_TEXT = `This player will be kick out of the game.`;

export const WaitingRoomComponent = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [concernedPlayer, setConcernedPlayer] = useState({});
  const [host, setHost] = useState(false);
  const { room, socketId } = useSelector((state) => state.appState);
  const appState = useSelector((state) => state.appState);

  location.href = "#" + room.name + "[" + appState.playerName + "]";

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

  const copyLink = () => {
    navigator.clipboard.writeText(location.href.split("[")[0]);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
    <Grid style={GridContainerStyle}>
      <div style={HeaderPaperContainer}>
        <Paper style={PlayersHeaderPaperStyle}>
          <div style={ShareLinkButton}>
            <Button onClick={copyLink}>
              <LinkIcon />
            </Button>
          </div>
          <div style={CenteredContainer}>{room.name}</div>
          <div style={HeaderSpanContainer}>{room.players.length}/8</div>
        </Paper>
      </div>

      <Grid
        item
        xs={8}
        style={{ ...CenteredContainer, flexDirection: "column" }}
      >
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

      <div style={CenteredContainer}>
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
      </div>

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

      {linkCopied && (
        <div style={LinkCopiedContainer}>
          <div style={LinkCopied}>Share link copied !</div>
        </div>
      )}
    </Grid>
  );
};
