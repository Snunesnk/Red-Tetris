import React from "react";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import {
    Title,
    TitleContainer,
    TitleTextContainer,
} from "./styles";

export const TitleComponent = ({ text }) => {
    const appState = useSelector(state => state.appState);

    return (
        <TitleContainer>
            <Grid container>
                <Grid item xs={12} style={TitleTextContainer}>
                    <Title>Red Tetris</Title>
                </Grid>
            </Grid>
        </TitleContainer>
    );
}