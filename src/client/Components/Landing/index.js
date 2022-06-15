import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Paper
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
    MainInputStyle,
    MainInputContainerStyle,
    MainButtonStyle,
    LandingInputStyle,
    LandingGridItem,
    LandingGridContainer
} from "./styles";

export const LandingComponent = () => {
    const dispatch = useDispatch();
    const [playerName, setPlayerName] = useState("");

    return (
        <Grid container id="landing-grid" style={LandingGridContainer}>
            <Grid item xs={12} style={LandingGridItem}>
                <Paper
                    component="form"
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={MainInputStyle}>
                                <div style={MainInputContainerStyle}>
                                    <TextField
                                        label="Enter your pseudo ..."
                                        variant="filled"
                                        inputProps={{
                                            style: LandingInputStyle,
                                            onChange: (e) => setPlayerName(e.target.value)
                                        }}
                                        autoFocus
                                        fullWidth>
                                    </TextField>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={MainButtonStyle}>
                                <Button
                                    variant="contained"
                                    onClick={() => dispatch({ type: "state:pseudoEntered", playerName: playerName })}
                                    disabled={playerName.length === 0}>
                                    Next
                                </Button>
                            </div>
                        </Grid>
                    </Grid >
                </Paper>
            </Grid >
        </Grid >
    );
}