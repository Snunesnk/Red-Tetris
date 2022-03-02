import React from "react";
import { LineStyle } from "./styles";
import { CellComponent } from "../../Components/Cell/index";

export const LineComponent = ({
    y_pos
}) => {
    let cells = Array.from({ length: 10 }, (_, i) => (
        <CellComponent key={'cell_' + y_pos + '_' + i} x-pos={i} />
    ));

    return (
        <div style={LineStyle} data-y-pos={y_pos} >
            {cells}
        </div>
    );
}