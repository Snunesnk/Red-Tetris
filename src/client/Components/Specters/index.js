import React from "react";
import { useSelector } from "react-redux";
import { CellComponent } from "../Cell/index";
import { GridContainer } from './styles'
import { INNER_TETRIS_COLORS, OUTER_TETRIS_COLORS } from "../../constants";

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

                    // Handle specter
                    if (x > 7) {
                        innerColor = INNER_TETRIS_COLORS[0];
                        outerColor = OUTER_TETRIS_COLORS[x - 7];
                    }
                    else {
                        innerColor = INNER_TETRIS_COLORS[+x];
                        outerColor = OUTER_TETRIS_COLORS[+x];
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
