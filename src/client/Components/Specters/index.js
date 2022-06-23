import React from "react";
import { useSelector } from "react-redux";
import { CellComponent } from "../Cell/index";
import { GridContainer } from './styles'
import { INNER_TETRIS_COLORS, OUTER_TETRIS_COLORS, WHITE_COLOR } from "../../constants";

export const SpecterComponent = () => {
    let specters = useSelector(state => state.appState.specters);

    specters = specters.map(specter => {
        let y_pos = -1;

        return specter.map.map(y => {
            y_pos++;

            let x_pos = -1;
            return (
                y.map(x => {
                    let innerColor;
                    let outerColor;

                    // Only two cases here: a background cell or a specter cell
                    // Background
                    if (x == 0) {
                        innerColor = INNER_TETRIS_COLORS[x];
                        outerColor = OUTER_TETRIS_COLORS[x];
                    }
                    // Specter
                    else {
                        innerColor = WHITE_COLOR;
                        outerColor = WHITE_COLOR;
                    }
                    x_pos++;

                    return (
                        <CellComponent
                            key={'cell_' + y_pos + '_' + x_pos}
                            x_pos={x_pos}
                            y_pos={y_pos}
                            inner_color={innerColor}
                            outer_color={outerColor}
                        />
                    )
                })
            )
        });
    });

    return (
        <div>
            {specters.map((specter, i) => (
                <div style={GridContainer} key={i}>
                    {specter}
                </div>
            ))}
        </div>
    );
}
