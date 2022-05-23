import React from "react";
import { CellStyle, InnerCellStyle, setCellBackground } from "./styles";


export const CellComponent = ({ color, x_pos, y_pos, dispatch }) => {
    // Don't know how to edit the background color after import
    const CellStyle = {
        minHeight: '15px',
        minWidth: '15px',
        padding: '0.1em',
        backgroundColor: color,
        borderTop: '1px solid white',
        borderLeft: '1px solid white'
    }

    return (
        <div
            style={CellStyle}
            onClick={() => dispatch({ type: "incr/clicked", pos: [x_pos, y_pos] })}
            id={'cell_' + y_pos + '_' + x_pos}
        >
            <div style={InnerCellStyle}></div>
        </div>
    );
}