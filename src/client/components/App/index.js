import React from "react";
import { TitleComponent } from "../Title/index";
import { BoardComponent } from "../Board/index"
import {
    AppContainerStyle,
    TitleContainerStyle,
    BoardContainerStyle
} from "./styles";
import emitSignal from "../../Socket/socketEmitters";

export const App = () => (
    <div id="app_div" style={AppContainerStyle} onKeyDown={(e) => emitSignal(e.key)} tabIndex="0">
        <div style={TitleContainerStyle}>
            <TitleComponent text={"Red Tetris"}></TitleComponent>
        </div>
        <div style={BoardContainerStyle}>
            <BoardComponent></BoardComponent>
        </div >
        <div style={{ width: '33%' }}></div>
    </div >
);