import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import {
    Title,
    CenteredContainer,
} from "./styles";

export const TitleComponent = () => {
    const appState = useSelector(state => state.appState);

    return (
        <Grid container>
            {/* Add an invisible grid for when the screen is not wide
                enough to be displayed on 1 line, there's still some space 
                on the left side of the title */}
            <Grid item xs={2}></Grid>
            <Grid item xs={8} style={CenteredContainer}>
                <Title>Red Tetris</Title>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}