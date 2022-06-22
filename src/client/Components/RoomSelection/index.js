import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, Button, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  CenteredContainer,
  JoinRoomBtnStyle,
  PaperHeaderRowStyle,
  PaperRowStyle,
  DialogBtnContainerStyle,
  JoinButtonContainer,
  GridRow,
  CreateRoomBtn,
  HeaderContainer,
  StartContainer,
} from "./styles";
import { LandingInputStyle } from "../Landing/styles";

export const RoomSelectionComponent = () => {
  const [open, setOpen] = useState(false);
  const rows = useSelector((state) => state.appState).roomList;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  dispatch({ type: "game:list" });
  let newRoomName = "";
  const playerName = useSelector((state) => state.appState).playerName;

  return (
    <Grid container style={CenteredContainer}>
      {/* Table header */}
      <Grid item xs={10} md={8} xl={7} style={StartContainer}>
        <span>Available rooms</span>
      </Grid>
      <Grid item xs={10} md={8} xl={7} style={HeaderContainer}>
        <Grid container>
          <Grid item xs={10}>
            <Paper style={PaperHeaderRowStyle}>
              <Grid container>
                <Grid item xs={4} xl={5} style={CenteredContainer}>
                  Name
                </Grid>
                <Grid item xs={4} xl={5} style={CenteredContainer}>
                  Host
                </Grid>
                <Grid item xs={4} xl={2} style={CenteredContainer}>
                  Players
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2} style={JoinButtonContainer}>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              style={CreateRoomBtn}
            >
              Create Room
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Table rows */}
      {rows.map((row, i) => (
        <Grid item xs={10} md={8} xl={7} style={GridRow} key={i}>
          <Grid container>
            <Grid item xs={10}>
              <Paper style={PaperRowStyle} elevation={2}>
                <Grid container>
                  <Grid item xs={4} xl={5} style={CenteredContainer}>
                    {row.name}
                  </Grid>
                  <Grid item xs={4} xl={5} style={CenteredContainer}>
                    {row.players.length > 0 && row.players[0].name}
                  </Grid>
                  <Grid item xs={4} xl={2} style={CenteredContainer}>
                    {row.players.length}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={2} style={JoinButtonContainer}>
              <Button
                variant="contained"
                style={JoinRoomBtnStyle}
                onClick={() => {
                  location.href = "#" + row.name + "[" + playerName + "]";
                  dispatch({
                    type: "game:join",
                    roomName: row.name,
                    playerName: playerName,
                  });
                }}
              >
                Join
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <TextField
            label="Enter room name"
            variant="filled"
            inputProps={{
              style: LandingInputStyle,
              onChange: (e) => {
                newRoomName = e.target.value;
              },
            }}
            fullWidth
            autoFocus
          ></TextField>
        </DialogContent>
        <DialogActions style={DialogBtnContainerStyle}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            // type="submit"
            onClick={() => {
              handleClose();
              location.href = "#" + newRoomName + "[" + playerName + "]";
              dispatch({
                type: "game:create",
                roomName: newRoomName,
                playerName: playerName,
              });
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
