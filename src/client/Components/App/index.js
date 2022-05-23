import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitingRoomComponent } from "../WaitingRoom";
import { CenteredContainer } from "./styles";
import emitMoveInGame from "./game";

function onKeyDown(e, isGameStarted) {
    if (isGameStarted)
        emitMoveInGame(e.key);
}

export function App() {
    const appState = useSelector(state => state.appState);

    // Force focus so we can get the keys pressed
    useEffect(() => {
        document.addEventListener('keydown', (e) => onKeyDown(e, appState.isGameStarted));
    });

    return (
        <div id="app_div" style={CenteredContainer} onKeyDown={onKeyDown}>
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