import React, { useEffect, useState } from "react";
import { InfosContainer, TimerInfos } from "./styles";
import { useDispatch, useSelector } from "react-redux";

const BoardClock = ({ color, clockStart, timer }) => {
  let startTime;
  let duration = 0;
  let stop = false;
  const appState = useSelector((state) => state.appState);
  const [minutes, setMinutes] = useState(timer);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const containerStyle = {
    border: "7px solid " + color,
    padding: "10px",
    backgroundColor: "black",
    width: "10vh",
    fontSize: "1.25vh",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  };

  const iteration = () => {
    if (stop) return;
    const elapsedTime = Date.now() - startTime;
    const remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      dispatch({ type: "state:timeOver", playerName: appState.playerName });
    } else {
      setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));
      setSeconds(Math.floor((remainingTime / 1000) % 60));
      window.requestAnimationFrame(iteration);
    }
  };

  useEffect(() => {
    if (appState.isGameOver) {
      stop = true;
    }
  }, [appState.isGameOver]);

  useEffect(() => {
    if (clockStart) {
      startTime = Date.now();
      duration = timer * 60 * 1000;
      window.requestAnimationFrame(iteration);
    } else duration = 0;
  }, [clockStart]);

  const timeStyle =
    minutes === 0 && seconds < 30
      ? { ...TimerInfos, color: "red" }
      : TimerInfos;

  return (
    <div style={InfosContainer}>
      <div style={containerStyle}>
        <div>Timer</div>
        <div style={timeStyle}>{minutes < 10 ? "0" + minutes : minutes}</div>
        <div style={timeStyle}>{seconds < 10 ? "0" + seconds : seconds}</div>
      </div>
    </div>
  );
};

export default BoardClock;
