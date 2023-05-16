import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, Button, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  RoomSelectionContainer,
  CenteredContainer,
  JoinRoomBtnStyle,
  PaperHeaderRowStyle,
  PaperRowStyle,
  DialogBtnContainerStyle,
  CreateRoomBtn,
  HeaderContainer,
  StartContainer,
  RowsContainer,
  BodyContainer,
} from "./styles";
import { LandingInputStyle } from "../Landing/styles";
import { STATUS } from "../../constants";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";

export const RoomSelectionComponent = () => {
  const [open, setOpen] = useState(false);
  const rows = useSelector((state) => state.appState).roomList;
  const dispatch = useDispatch();
  let newRoomName = "";
  const playerName = useSelector((state) => state.appState).playerName;

  dispatch({ type: "game:list" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch("http://localhost:3042/getTopTenScores", options);
  }, []);

  const joinRoom = (roomName) => {
    location.href = "#" + roomName + "[" + playerName + "]";
    dispatch({
      type: "game:join",
      roomName: roomName,
      playerName: playerName,
    });
  };

  return (
    <div style={RoomSelectionContainer} className="room-selection-container">
      {/* Table header */}
      <div style={StartContainer}>
        <span style={{ fontSize: "0.8rem" }}>Join or host a game</span>
        <div style={HeaderContainer} id="room-selection-header-container">
          <div style={PaperHeaderRowStyle} id="room-selection-paper-header">
            <div style={CenteredContainer}>Name</div>
            <div style={CenteredContainer}>Host</div>
            <div style={CenteredContainer}>Players</div>
            <div style={CenteredContainer}>Status</div>
          </div>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            style={CreateRoomBtn}
          >
            <AddIcon style={{ fontSize: "2.5rem" }} />
          </Button>
        </div>

        {rows.length === 0 && (
          <div style={{ color: "#EC008C", fontSize: "0.8rem" }}>
            No game to join
          </div>
        )}
        {rows.length > 0 && (
          <div style={RowsContainer}>
            {/* Table rows */}
            {rows.map((row, i) => (
              <div style={BodyContainer} key={i}>
                <Paper style={PaperRowStyle} elevation={2}>
                  <div style={CenteredContainer}>{row.name}</div>
                  <div style={CenteredContainer}>
                    {row.players.length > 0 && row.players[0].name}
                  </div>
                  <div style={CenteredContainer}>{row.players.length}</div>
                  <div style={CenteredContainer}>
                    <FiberManualRecordIcon
                      sx={{
                        color:
                          row.status === STATUS.WAITING_ROOM ? "green" : "red",
                        fontSize: 25,
                      }}
                    ></FiberManualRecordIcon>
                  </div>
                </Paper>

                <Button
                  variant="contained"
                  style={JoinRoomBtnStyle}
                  disabled={!(row.status === STATUS.WAITING_ROOM)}
                  onClick={() => {
                    joinRoom(row.name);
                  }}
                >
                  <ArrowForwardIosIcon style={{ fontSize: "1.2rem" }} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

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
    </div>
  );
};
