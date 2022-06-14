import { flexbox } from "@mui/system";
import React from "react";

export const CellComponent = ({ inner_color, outer_color, x_pos, y_pos, dispatch }) => {
    let innerSize = inner_color === "black" ? "65px" : "52px";

    // Don't know how to edit the background color after import
    const CellStyle = {
        height: '68px',
        width: '68px',
        backgroundColor: outer_color,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
        // borderTop: '1px solid white',
        // borderLeft: '1px solid white'
    };

    const InnerCellStyle = {
        backgroundColor: inner_color,
        height: innerSize,
        width: innerSize,
    };

    const BackgroundCell = {
        height: '69px',
        width: '69px',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#141e30",
    };

    return (
        <div id={'cell_' + y_pos + '_' + x_pos} style={BackgroundCell}>
            <div style={CellStyle}>
                <div style={InnerCellStyle}></div>
            </div>
        </div >
    );
}