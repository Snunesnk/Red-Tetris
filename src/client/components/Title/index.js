import React from "react";
import { Grid, Paper } from "@mui/material";
import {
    Title,
    TitleContainer,
    PseudoPaperStyle,
    CenteredContainer
} from "./styles";

export const TitleComponent = ({
    text,
    mode
}) => (
    <TitleContainer>
        <Grid container>
            <Grid item xs={3}></Grid>

            <Grid item xs={6} style={CenteredContainer}>
                <Title>{text}</Title>
            </Grid>

            <Grid item xs={3} style={CenteredContainer}>
                {mode.isPseudoEntered && mode.pseudo != "" && (
                    <Paper style={PseudoPaperStyle} elevation={1}>
                        <span>{mode.pseudo}</span>
                    </Paper>)}
            </Grid>
        </Grid>
    </TitleContainer>
);