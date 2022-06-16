import React from "react";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import {
    PseudoPaperStyle,
} from "./styles";

export const PlayerPseudoComponent = () => {
    const appState = useSelector(state => state.appState);

    return (
        <Paper style={PseudoPaperStyle} elevation={1}>
            <span>{appState.playerName}</span>
        </Paper >)
}