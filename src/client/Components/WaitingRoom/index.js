import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
    GridContainerStyle,
    PlayButtonStyle,
    CenteredContainer,
    PlayersHeaderPaperStyle,
    PlayersPaperStyle,
    HostPlayersPaperStyle,
    HeaderPaperContainer,
    HeaderSpanContainer
} from "./styles";

export const WaitingRoomComponent = () => {
    const dispatch = useDispatch();
    const appState = useSelector(state => state.appState);
    const room = useSelector((state) => state.appState).room;

    console.log(room);
    return (
        <Grid container style={GridContainerStyle}>

            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={6} style={HeaderPaperContainer}>
                <Paper style={PlayersHeaderPaperStyle}>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4} style={CenteredContainer}>Players</Grid>
                        <Grid item xs={4} style={HeaderSpanContainer}>{room.players.length}/8</Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={1} md={3}></Grid>

            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={6}>
                <Grid container style={CenteredContainer}>
                    <Grid item xs={8}>
                        {room.players.map((player, i) => (
                            <Paper style={i == 0 ? HostPlayersPaperStyle : PlayersPaperStyle} key={i}>
                                {player.name}
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} md={3}></Grid>

            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={6} style={CenteredContainer}>
                <Button
                    variant="contained"
                    style={PlayButtonStyle}
                    size="large"
                    fullWidth
                    onClick={() => { dispatch({ type: "game:start", roomName: appState.roomName, playerName: appState.playerName }) }}
                >
                    Start
                </Button>
            </Grid>
            <Grid item xs={1} md={3}></Grid>
        </Grid >
    )
}