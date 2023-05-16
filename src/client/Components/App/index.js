import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index";
import { LandingComponent } from "../Landing";
import { RoomSelectionComponent } from "../RoomSelection";
import { WaitingRoomComponent } from "../WaitingRoom";
import { appDiv, CenteredContainer } from "./styles";
import { emitMoveInGame } from "../../Socket/InGame/move";
import { PlayerPseudoComponent } from "../PlayerPseudo";

let appState;

function onKeyDown(e) {
  if (appState.isGameStarted) {
    emitMoveInGame(e.key, appState);
  }
}

function stopAudio(audio) {
  if (typeof audio.loop == "boolean") {
    audio.loop = false;
  } else {
    audio.removeEventListener("ended", function () {
      audio.currentTime = 0;
      audio.play();
    });
  }

  audio.pause();
  audio.currentTime = 0;
}

// Prepare music to be played
var audio = new Audio("korobeiniki.mp3");
if (typeof audio.loop == "boolean") {
  audio.loop = true;
} else {
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });
}

export function App() {
  appState = useSelector((state) => state.appState);

  useEffect(() => {
    // Force focus to get all keys pressed
    if (appState.isGameStarted) {
      document.addEventListener("keydown", onKeyDown);
      audio.play();
    } else {
      document.removeEventListener("keydown", onKeyDown);
      stopAudio(audio);
    }
  }, [appState.isGameStarted]);

  return (
    <div id="app_div" style={appDiv}>
      <Grid container>
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
            <div style={CenteredContainer}>
              <RoomSelectionComponent></RoomSelectionComponent>
            </div>
          )}

        {appState.isGameStarted == false &&
          appState.isPseudoEntered == true &&
          appState.isRoomSelected == true && (
            <div style={CenteredContainer}>
              <WaitingRoomComponent></WaitingRoomComponent>
            </div>
          )}

        {appState.isGameStarted === true && <BoardComponent></BoardComponent>}

        {appState.isPseudoEntered && (
          <PlayerPseudoComponent></PlayerPseudoComponent>
        )}
      </Grid>
    </div>
  );
}
