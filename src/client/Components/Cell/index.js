import { flexbox } from "@mui/system";
import React from "react";

export const CellComponent = ({ inner_color, outer_color, x_pos, y_pos }) => {
    // Handle The inner cell color size, different for background, Tetrimino or Tetrimino specter
    // Tetrimino, base size
    let widthPadding = "75%";
    let border = "";
    // Background, size: 1.3 * base size
    if (outer_color === "black" && inner_color == "#141e30") {
        widthPadding = "85%";
    }
    // Tetrimino specter, size: 1.2 * base size
    else if (inner_color === "#141e30") {
        border = "0.15em dashed " + outer_color;
        inner_color = outer_color + "32";
        outer_color = "black";
        console.log("Inner color: " + inner_color);
    }

    // // Don't know how to edit the background color after import
    // // Size: 1.4 * base size
    // const CellStyle = {
    //     padding: cellPadding,
    //     backgroundColor: outer_color,
    // };

    const InnerCellStyle = {
        backgroundColor: inner_color,
        paddingBottom: widthPadding,
        width: widthPadding,
        border: border
    };

    // Size: 1.44 * base size
    const BackgroundCell = {
        border: "solid 0.1em #141e30",
        backgroundColor: outer_color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    return (
        <div id={'cell_' + y_pos + '_' + x_pos} style={BackgroundCell}>
            <div style={InnerCellStyle}></div>
        </div >
    );
}