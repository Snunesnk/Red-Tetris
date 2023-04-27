import { RED_COLOR, OUTER_TETRIS_COLORS } from "../../constants";

export const ModalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

export const CenteredContainer = {
  display: "flex",
  justifyContent: "center",
};

export const ModalMessage = {
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.45)",
  fontSize: "3em",
  paddingTop: "1em",
  paddingBottom: "1em",
  color: RED_COLOR,
  lineHeight: "4.2rem",
  paddingLeft: "1em",
  paddingRight: "1em",
};

export const ScoreModalMessage = {
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.45)",
  fontSize: "2em",
  paddingTop: "1em",
  paddingBottom: "1em",
  color: "white",
  lineHeight: "4.2rem",
  paddingLeft: "1em",
  paddingRight: "1em",
};

export const ModalMessageWin = {
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.45)",
  fontSize: "3em",
  paddingTop: "1em",
  paddingBottom: "1em",
  color: OUTER_TETRIS_COLORS[6],
  lineHeight: "4.2rem",
  paddingLeft: "1em",
  paddingRight: "1em",
};
