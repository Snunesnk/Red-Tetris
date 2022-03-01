import React from "react";
import { TitleComponent } from "../../Components/Title/index";
import { BoardComponent } from "../Board/index"
import { AppContainer } from "./styles";

export const App = () => (
    <AppContainer>
        <TitleComponent text={"Red Tetris"}></TitleComponent>
        <BoardComponent></BoardComponent>
    </AppContainer>
);