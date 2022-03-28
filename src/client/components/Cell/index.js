import React from "react";
import { CellStyle, InnerCellStyle, setCellBackground } from "./styles";


export const CellComponent = ({ color }) => {
    // Don't know how to edit the background color after import
    const CellStyle = {
        minHeight: '15px',
        minWidth: '15px',
        padding: '0.1em',
        backgroundColor: color,
        borderTop: '1px solid black',
        borderLeft: '1px solid black'
    }

    return (
        <div style={CellStyle} >
            <div style={InnerCellStyle}></div>
        </div>
    );
}