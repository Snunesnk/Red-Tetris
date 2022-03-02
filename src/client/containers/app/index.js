import React from "react";
import { TitleComponent } from "../../Components/Title/index";
import { BoardComponent } from "../Board/index"
import {
    AppContainerStyle,
    TitleContainerStyle,
    BoardContainerStyle
} from "./styles";

export const App = () => (
    <div style={AppContainerStyle}>
        <div style={TitleContainerStyle}>
            <TitleComponent text={"Red Tetris"}></TitleComponent>
        </div>
        <div style={BoardContainerStyle}>
            <BoardComponent></BoardComponent>
        </div >
        <div style={{width: '33%'}}></div>
    </div >
);