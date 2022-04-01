import React from "react";
import { useState } from "react";
import {
    Paper,
    Button,
    Grid,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import {
    PseudoPaperStyle,
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
import { LandingInputLabelStyle, LandingInputStyle } from "../Landing/styles";

const rows = [
    {
        roomName: "first room",
        owner: "Thierry",
        players: "1"
    },
    {
        roomName: "second room",
        owner: "Jessica",
        players: "2"
    },
    {
        roomName: "third room",
        owner: "Dominique",
        players: "3"
    },
    {
        roomName: "Super Fun Room Come XD lool",
        owner: "BTS<3",
        players: "765"
    },
    {
        roomName: "Tetris",
        owner: "Tetris",
        players: "10"
    },
    {
        roomName: "Pls come",
        owner: "Xx_d4rk_s4suk3_xX",
        players: "1"
    }
]

export const RoomSelectionComponent = ({ mode, setMode }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const JoinRoom = (roomName) => {
        setMode((prev) => {
            return {
                ...prev,
                isRoomSelected: true,
                roomName: roomName
            }
        });
    }

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
                                        {row.roomName}
                                    </Grid>
                                    <Grid item xs={5} style={TableColStyle}>
                                        {row.owner}
                                    </Grid>
                                    <Grid item xs={2} style={TableColStyle}>
                                        {row.players}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={2} style={TableColStyle}>
                            <Button
                                variant="contained"
                                style={JoinRoomBtnStyle}
                                onClick={() => JoinRoom(row.roomName)}
                            >
                                Join
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            ))}

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogContent>
                    <TextField
                        label="Enter room name"
                        variant="standard"
                        InputLabelProps={{ style: LandingInputLabelStyle }}
                        inputProps={{
                            style: LandingInputStyle, onChange: (e) => {
                                setMode((prev) => {
                                    return {
                                        ...prev,
                                        roomName: e.target.value
                                    };
                                })
                            }
                        }}
                    fullWidth
                    >
                </TextField>
            </DialogContent>
            <DialogActions style={DialogBtnContainerStyle}>
                <Button
                    variant="contained"
                    style={DialogBtn}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={DialogBtn}
                    onClick={() => { handleClose(); JoinRoom(mode.roomName) }}
                >
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
        </Grid >
    )
}