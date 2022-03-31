import React from "react";
import {
    Paper,
    Button,
    Grid,
} from "@mui/material";
import {
    PseudoPaperStyle,
    GridContainerStyle,
    CreateRoomButtonStyle,
    CenteredContainer,
    TableHeaderStyle,
    JoinRoomBtnStyle,
    TableColStyle,
    TableRowStyle,
    PaperRowStyle
} from "./styles";

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

export const RoomSelectionComponent = ({ pseudo }) => {
    return (
        <Grid container style={GridContainerStyle}>
            <Grid item xs={7}>
                <Paper style={PseudoPaperStyle} elevation={10}>
                    <span>Welcome {pseudo} !</span>
                </Paper>
            </Grid>

            <Grid item xs={7}>
                <div style={CenteredContainer}>
                    <Button
                        variant="contained"
                        style={CreateRoomButtonStyle}
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
                        <Paper style={PaperRowStyle}>
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
                        <Grid item xs={2}>
                            <Button
                                variant="contained"
                                style={JoinRoomBtnStyle}
                            >
                                Join
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}