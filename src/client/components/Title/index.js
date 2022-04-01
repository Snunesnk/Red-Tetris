import React from "react";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import {
    Title,
    TitleContainer,
    PseudoPaperStyle,
    CenteredContainer
} from "./styles";

export const TitleComponent = ({ text }) => {
    const appState = useSelector(state => state.appState);
    const playerName = useSelector(state => state.playerName);

    return (
        <TitleContainer>
            <Grid container>
                <Grid item xs={3}></Grid>

                <Grid item xs={6} style={CenteredContainer}>
                    <Title>{text}</Title>
                </Grid>

                <Grid item xs={3} style={CenteredContainer}>
                    {appState.isPseudoEntered && (
                        <Paper style={PseudoPaperStyle} elevation={1}>
                            <span>{playerName}</span>
                        </Paper>)}
                </Grid>
            </Grid>
        </TitleContainer>
    );
}