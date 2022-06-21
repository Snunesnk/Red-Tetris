import { flexbox } from "@mui/system";
import React from "react";

export const CellComponent = ({ inner_color, outer_color, x_pos, y_pos }) => {
    // Handle The inner cell color size, different for background, Tetrimino or Tetrimino specter
    // Tetrimino, base size
    const baseSize = 2.6
    let innerSize = baseSize;
    // Background, size: 1.3 * base size
    if (outer_color === "black" && inner_color == "#141e30") {
        innerSize *= 1.3;
    }
    // Tetrimino specter, size: 1.2 * base size
    else if (outer_color === "black") {
        innerSize *= 1.2;
    }

    // Don't know how to edit the background color after import
    // Size: 1.4 * base size
    const CellStyle = {
        height: (baseSize * 1.45).toFixed(1) + "vh",
        width: (baseSize * 1.45).toFixed(1) + "vh",
        backgroundColor: outer_color,
        display: 'flex',
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexWrap: "wrap"
    };

    const InnerCellStyle = {
        backgroundColor: inner_color,
        height: innerSize.toFixed(1) + "vh",
        width: innerSize.toFixed(1) + "vh",
    };

    // Size: 1.44 * base size
    const BackgroundCell = {
        height: (baseSize * 1.55).toFixed(1) + "vh",
        width: (baseSize * 1.55).toFixed(1) + "vh",
        display: 'flex',
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
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