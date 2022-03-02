import React from "react";
import {
    CellStyle,
    InnerCellStyle
} from "./styles";

export const CellComponent = ({
    x_pos
}) => (
    <div style={CellStyle} data-x-pos={x_pos} >
        <div style={InnerCellStyle}></div>
    </div>
);