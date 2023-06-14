import React, { useEffect } from "react";

import { Button } from "@mui/material";
import { PaperHeaderRowStyle, QuickGameBtn, HeaderContainer } from "./styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";

const QuickGame = () => {
  const [gameDuration, setGameDuration] = React.useState(-1);
  const appState = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("gameDuration")) {
      setGameDuration(localStorage.getItem("gameDuration"));
    }
  }, []);

  const handleChange = (e) => {
    setGameDuration(e.target.value);
  };

  const goToQuickGame = () => {
    localStorage.setItem("gameDuration", gameDuration);
    dispatch({
      type: "game:startQuick",
      playerName: appState.playerName,
      gameDuration: gameDuration,
    });
  };

  return (
    <div style={HeaderContainer}>
      <div style={PaperHeaderRowStyle}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Game duration</InputLabel>
          <Select
            labelId="quick-game-select-label"
            id="quick-game-select"
            value={gameDuration}
            label="Game duration"
            onChange={handleChange}
          >
            <MenuItem value={2}>2 minutes</MenuItem>
            <MenuItem value={5}>5 minutes</MenuItem>
            <MenuItem value={10}>10 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={-1}>No Limit</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={goToQuickGame} style={QuickGameBtn}>
        quick game
      </Button>
    </div>
  );
};

export default QuickGame;
