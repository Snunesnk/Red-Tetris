import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitingRoomComponent } from "../WaitingRoom";
import { CenteredContainer, MainGrid } from "./styles";
import { emitMoveInGame } from "../../Socket/InGame/move";
import { PlayerPseudoComponent } from "../PlayerPseudo";

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
            <Grid container spacing={2} style={MainGrid}>
                <Grid item xs={12}>
                    <TitleComponent></TitleComponent>
                </Grid>

                {appState.isGameStarted == false && appState.isPseudoEntered == false && (
                    <LandingComponent></LandingComponent>
                )}

                {appState.isGameStarted == false && appState.isPseudoEntered == true && appState.isRoomSelected == false && (
                    <RoomSelectionComponent></RoomSelectionComponent>
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

                {appState.isPseudoEntered && (
                    <PlayerPseudoComponent></PlayerPseudoComponent>
                )}
            </Grid>
        </div >
    );
}