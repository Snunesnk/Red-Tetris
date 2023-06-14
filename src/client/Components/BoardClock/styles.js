import { RED_COLOR, WHITE_COLOR } from "../../constants";

export const InfosContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  textAlign: "center",
  paddingBottom: "0.5em",
  marginTop: "0",
  marginRight: "0.7em",
  color: RED_COLOR,
  position: "absolute",
  bottom: "-16px",
  right: "calc(35vh + 5px)",
};
export const CenteredContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  marginTop: "0",
  color: RED_COLOR,
};

export const GridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 25%)",
  gridTemplateRows: "repeat(12, 1fr)",
  width: "7vh",
  height: "21vh",
};

export const TimerInfos = {
  color: WHITE_COLOR,
  fontSize: "15px",
};
