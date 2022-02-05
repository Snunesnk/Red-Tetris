import React from "react";
import { TitleComponent } from "../../components/Title/index";
import { Board } from "../board/index"
import { AppContainer } from "./styles";

export const App = () => (
    <AppContainer>
        <TitleComponent text={"Red Tetris"}></TitleComponent>
        <Board></Board>
    </AppContainer>
);