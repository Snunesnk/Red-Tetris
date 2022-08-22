import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitingRoomComponent } from "../WaitingRoom";
import { CenteredContainer, appDiv } from "./styles";
import { emitMoveInGame } from "../../Socket/InGame/move";
import { PlayerPseudoComponent } from "../PlayerPseudo";

let appState;

function onKeyDown(e) {
  if (appState.isGameStarted) {
    emitMoveInGame(e.key, appState);
  }
}

export function App() {
  appState = useSelector((state) => state.appState);
  useEffect(() => {
    // Prepare music to play
    var audio = new Audio("korobeiniki.mp3");
    if (typeof audio.loop == "boolean") {
      audio.loop = true;
    } else {
      audio.addEventListener(
        "ended",
        function () {
          audio.currentTime = 0;
          audio.play();
        },
        false
      );
    }

    // Force focus to get all keys pressed
    if (appState.isGameStarted) {
      document.addEventListener("keydown", onKeyDown);
      audio.play();
    }
    else
      document.removeEventListener("keydown", onKeyDown);
  }, [appState.isGameStarted]);

  return (
    <div id="app_div" style={appDiv}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleComponent></TitleComponent>
        </Grid>

        {appState.isGameStarted == false &&
          appState.isPseudoEntered == false && (
            <LandingComponent></LandingComponent>
          )}

        {appState.isGameStarted == false &&
          appState.isPseudoEntered == true &&
          appState.isRoomSelected == false && (
            <RoomSelectionComponent></RoomSelectionComponent>
          )}

        {appState.isGameStarted == false &&
          appState.isPseudoEntered == true &&
          appState.isRoomSelected == true && (
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
    </div>
  );
}
