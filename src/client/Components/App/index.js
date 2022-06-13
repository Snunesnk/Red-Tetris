import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitingRoomComponent } from "../WaitingRoom";
import { CenteredContainer } from "./styles";
import { emitMoveInGame } from "../../Socket/InGame/move";

function onKeyDown(e, isGameStarted, appState) {
    if (isGameStarted)
        emitMoveInGame(e.key, appState);
}

export function App() {
    const appState = useSelector(state => state.appState);

    useEffect(() => {
        // Force focus to get all keys pressed
        document.addEventListener('keydown',
            (e) => onKeyDown(e, appState.isGameStarted, appState));
    }, [appState]);

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