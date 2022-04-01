import React from "react";
import {
    TextField,
    Button,
    Grid,
    Paper
} from "@mui/material";
import {
    MainInputStyle,
    MainInputContainerStyle,
    MainButtonStyle,
    LandingButtonStyle,
    LandingInputLabelStyle,
    LandingInputStyle,
    LandingPaperStyle,
    LandingGridStyle
} from "./styles";

export const LandingComponent = ({ setMode }) => {
    return (
        <Grid container id="landing-grid">
            <Grid item xs={12} style={LandingGridStyle}>
                <Paper
                    component="form"
                    style={LandingPaperStyle}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <div style={MainInputStyle}>
                                <div style={MainInputContainerStyle}>
                                    <TextField
                                        label="Enter your pseudo ..."
                                        variant="standard"
                                        inputProps={{
                                            style: LandingInputStyle, onChange: (e) => {
                                                setMode((prev) => {
                                                    return {
                                                        ...prev,
                                                        pseudo: e.target.value
                                                    };
                                                })
                                            }
                                        }}
                                        InputLabelProps={{ style: LandingInputLabelStyle }}
                                        fullWidth
                                    >
                                    </TextField>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={MainButtonStyle}>
                                <Button
                                    style={LandingButtonStyle}
                                    variant="contained"
                                    onClick={() => setMode((prev) => {
                                        return {
                                            ...prev,
                                            isPseudoEntered: true
                                        };
                                    })}
                                >
                                    Next
                                </Button>
                            </div>
                        </Grid>
                    </Grid >
                </Paper>
            </Grid>
        </Grid>
    );
}