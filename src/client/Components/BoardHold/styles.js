import { RED_COLOR } from "../../constants"

export const InfosContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    textAlign: "center",
    paddingBottom: "0.5em",
    marginTop: "0",
    marginLeft: "0.7em",
    color: RED_COLOR,
}

export const CenteredTitleContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    marginBottom: "1em",
    color: RED_COLOR,
}

export const CenteredContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    marginTop: "1em",
    marginBottom: "1em",
    color: RED_COLOR,
}

export const GridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 25%)",
    gridTemplateRows: "repeat(4, 1fr)",
    width: "7vh",
    height: "7vh",
}
