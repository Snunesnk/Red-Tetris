import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Paper,
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
    let destRoom = "";
    let destPlayer = "";

    // Check if the player came from a link or not
    const my_url = new window.URL(location.href);

    if (my_url.hash != "") {
        // If there's a hash, assume that he is joining a room
        // If there's a '[' in the hash, then there's a pseudo to extract it
        // If not, there's only the roomname, so extract this only
        if (my_url.hash.indexOf("[") > -1) {
            // Remove the first '#' and the last ']', then separate the roomName and the playerName
            const infos = my_url.hash.slice(1, -1).split('[');
            destRoom = infos[0];
            destPlayer = infos[1];
        }
        else {
            destRoom = my_url.hash.slice(1, my_url.hash.length);
        }
    }

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
                                    onClick={() => {
                                        dispatch({
                                            type: "state:pseudoEntered",
                                            playerName: playerName,
                                            destRoom: destRoom,
                                            destPlayer: destPlayer
                                        });
                                    }}
                                    disabled={playerName.length === 0}
                                    type="submit">
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