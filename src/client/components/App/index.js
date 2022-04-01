import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitongRoomComponent } from "../WaitingRoom";
import { CenteredContainer } from "./styles";
import { emitMoveInGame } from "../../Socket/InGame/move";

const onKeyDown = (e) => {
    const dispatch = useDispatch();
    const appState = useSelector(store => store.appState);

    if (appState.isGameStarted)
        dispatch({ type: "inGame:move", keyCode: e.key });
}

export const App = () => {
    const appState = useSelector(state => state.appState);

    // Force focus so we can get the keys pressed
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
    });

    return (
        <div id="app_div" style={CenteredContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent text={"Red Tetris"}></TitleComponent>
                </Grid>

                {appState.isGameStarted == false && appState.isPseudoEntered == false && (
                    <Grid item xs={12}>
                        <LandingComponent></LandingComponent>
                    </Grid>
                )}

                {appState.isGameStarted == false && appState.isPseudoEntered == true && appState.isRoomSelected == false && (
                    <Grid item xs={12}>
                        <RoomSelectionComponent></RoomSelectionComponent>
                    </Grid>
                )}

                {appState.isGameStarted == false && appState.isPseudoEntered == true && appState.isRoomSelected == true && (
                    <Grid item xs={12}>
                        <WaitingRoomComponent></WaitingRoomComponent>
                    </Grid>
                )}

                {appState.isGameStarted === true && (
                    <Grid item xs={12}>
                        <BoardComponent></BoardComponent>
                    </Grid>
                )}
            </Grid>
        </div >
    );
}