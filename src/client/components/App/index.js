import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { AppContainerStyle } from "./styles";
import emitSignal from "../../Socket/socketEmitters";


const initialState = {
    isGameStarted: true
}

export const App = () => {
    const [mode, setMode] = useState(initialState);

    return (
        <div id="app_div" style={AppContainerStyle} onKeyDown={(e) => emitSignal(e.key)} tabIndex="0">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent text={"Red Tetris"}></TitleComponent>
                </Grid>

                {mode.isGameStarted == false && (
                    <Grid item xs={12}>
                        <LandingComponent></LandingComponent>
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