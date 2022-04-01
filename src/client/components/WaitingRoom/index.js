import React from "react";
import { Grid, Paper, Button } from "@mui/material";

import {
    GridContainerStyle,
    PseudoPaperStyle,
    PlayButtonStyle,
    CenteredContainer,
    PlayersHeaderPaperStyle,
    PlayersPaperStyle
} from "./styles";

const players = [
    {
        name: "Ryan",
        isHost: false
    },
    {
        name: "Brad",
        isHost: false
    },
    {
        name: "Chuck",
        isHost: false
    },
    {
        name: "Jack",
        isHost: true
    },
    {
        name: "Dwayne",
        isHost: false
    }
]

export const WaitongRoomComponent = ({ mode, setMode }) => {

    const startGame = () => {
        setMode((prev) => {
            return {
                ...prev,
                isGameStarted: true
            };
        });
    };

    return (
        <Grid container style={GridContainerStyle}>

            <Grid item xs={7}>
                <Grid container style={CenteredContainer}>
                    <Grid item xs={8}>
                        <Paper style={PlayersHeaderPaperStyle}>
                            <Grid container>
                                <Grid item xs={7} style={{ textAlign: "center" }}>
                                    Players
                                </Grid>
                                <Grid item xs={5} style={CenteredContainer}>
                                    <span>Total: {players.length}</span>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={7}>
                <Grid container style={CenteredContainer}>
                    <Grid item xs={8}>
                        {players.map((player, i) => (
                            <Paper style={PlayersPaperStyle} key={i}>
                                <Grid container>
                                    <Grid item xs={7} style={{ textAlign: "center" }}>
                                        {player.name}
                                    </Grid>
                                    {player.isHost && (
                                        <Grid item xs={5} style={{ textAlign: "center" }}>
                                            Host
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={7}>
                <div style={CenteredContainer}>
                    <Button
                        variant="contained"
                        style={PlayButtonStyle}
                        size="large"
                        fullWidth
                        onClick={startGame}
                    >
                        Start
                    </Button>
                </div>
            </Grid>
        </Grid >
    )
}