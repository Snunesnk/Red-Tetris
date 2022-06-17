import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, Button, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  GridContainerStyle,
  CreateRoomButtonStyle,
  CenteredContainer,
  TableHeaderStyle,
  JoinRoomBtnStyle,
  TableColStyle,
  TableRowStyle,
  PaperHeaderRowStyle,
  PaperRowStyle,
  DialogBtnContainerStyle,
  DialogBtn,
} from "./styles";
import { LandingInputStyle } from "../Landing/styles";


export const RoomSelectionComponent = () => {
  const [open, setOpen] = useState(false);
  const rows = useSelector((state) => state.appState).roomList;
  const dispatch = useDispatch();
  console.log(rows)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  dispatch({ type: "game:list" })
  let newRoomName = "";
  const playerName = useSelector((state) => state.appState).playerName;

  return (
    <Grid container style={GridContainerStyle}>
      <Grid item xs={7}>
        <div style={CenteredContainer}>
          <Button
            variant="contained"
            style={CreateRoomButtonStyle}
            onClick={handleClickOpen}
          >
            Create new room
          </Button>
        </div>
      </Grid>

      {/* Table header */}
      <Grid item xs={10}>
        <div style={{ marginTop: "3em", marginLeft: "10px" }}>
          <span>Available rooms</span>
        </div>
      </Grid>
      <Grid item xs={10} style={TableHeaderStyle}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={10}>
            <Paper style={PaperHeaderRowStyle}>
              <Grid container>
                <Grid item xs={5} style={TableColStyle}>
                  Room Name
                </Grid>
                <Grid item xs={5} style={TableColStyle}>
                  Room Host
                </Grid>
                <Grid item xs={2} style={TableColStyle}>
                  Players
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* Table rows */}
      {rows.map((row, i) => (
        <Grid item xs={10} style={TableRowStyle} key={i}>
          <Grid container>
            <Grid item xs={10}>
              <Paper style={PaperRowStyle} elevation={2}>
                <Grid container>
                  <Grid item xs={5} style={TableColStyle}>
                    {row.name}
                  </Grid>
                  <Grid item xs={5} style={TableColStyle}>
                    {row.players[0].name}
                  </Grid>
                  <Grid item xs={2} style={TableColStyle}>
                    {row.players.length}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={2} style={TableColStyle}>
              <Button
                variant="contained"
                style={JoinRoomBtnStyle}
                onClick={() => {
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
            variant="standard"
            InputLabelProps={{ style: LandingInputLabelStyle }}
            inputProps={{
              style: LandingInputStyle,
              onChange: (e) => {
                newRoomName = e.target.value;
              },
            }}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions style={DialogBtnContainerStyle}>
          <Button variant="contained" style={DialogBtn} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={DialogBtn}
            onClick={() => {
              handleClose();
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
