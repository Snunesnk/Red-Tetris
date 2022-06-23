import { RED_COLOR } from "../../constants"

export const GridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(10, 10%)",
    gridTemplateRows: "repeat(20, 5%)",
    width: "15vh",
    height: "30vh",
    marginTop: "1em"
}

export const SpectersContainers = {
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
    marginBottom: "1em"
}

export const PlayerPseudo = {
    fontSize: "1.3em",
    color: RED_COLOR
}