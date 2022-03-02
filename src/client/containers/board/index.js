import React from "react";
import { BoardStyle } from "./styles";
import { LineComponent } from "../BoardLine/index";

export const BoardComponent = () => {
    let lines = Array.from({ length: 20 }, (_, i) => (
        <LineComponent data_y_pos={i} key={'line_' + i}/>
    ));

    return (
        <div style={BoardStyle}>
            {lines}
        </div>
    );
}