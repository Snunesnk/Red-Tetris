import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitongRoomComponent } from "../WaitingRoom";
import { CenteredContainer } from "./styles";
import emitSignal from "../../Socket/socketEmitters";


const initialState = {
    isGameStarted: false,
    isPseudoEntered: true,
    isRoomSelected: false,
    pseudo: "SNK",
    roomName: ""
}

export const App = () => {
    const [mode, setMode] = useState(initialState);

    return (
        <div id="app_div" style={CenteredContainer} onKeyDown={(e) => emitSignal(e.key)} tabIndex="0">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent text={"Red Tetris"} mode={mode}></TitleComponent>
                </Grid>

                {mode.isGameStarted == false && mode.isPseudoEntered == false && (
                    <Grid item xs={12}>
                        <LandingComponent setMode={setMode}></LandingComponent>
                    </Grid>
                )}

                {mode.isGameStarted == false && mode.isPseudoEntered == true && mode.isRoomSelected == false && (
                    <Grid item xs={12}>
                        <RoomSelectionComponent mode={mode} setMode={setMode}></RoomSelectionComponent>
                    </Grid>
                )}

                {mode.isGameStarted == false && mode.isPseudoEntered == true && mode.isRoomSelected == true && (
                    <Grid item xs={12}>
                        <WaitongRoomComponent mode={mode} setMode={setMode}></WaitongRoomComponent>
                    </Grid>
                )}

                {mode.isGameStarted === true && (
                    <Grid item xs={12}>
                        <BoardComponent></BoardComponent>
                    </Grid>
                )}
            </Grid>
        </div >
    );
}