import React from "react";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import {
    Title,
    CenteredContainer,
} from "./styles";

export const TitleComponent = ({ text }) => {
    const appState = useSelector(state => state.appState);

    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={CenteredContainer}>
                <Title>Red Tetris</Title>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}