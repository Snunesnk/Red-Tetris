import React, { useState } from "react";
import { BoardStyle, LineStyle } from './styles'
import { CellComponent } from "../../Components/Cell/index";
import { DEFAULT_MAP, TETRIS_COLORS } from "../../constants";


export const BoardComponent = () => {
    const [map] = useState(DEFAULT_MAP);
    let y_pos = -1;

    return (
        <div style={BoardStyle}>
            {
                map.map(y => {
                    y_pos++;

                    let x_pos = -1;
                    return (
                        <div key={'line_' + y_pos} style={LineStyle}>
                            {
                                y.map(x => {
                                    x_pos++;

                                    return (
                                        <CellComponent key={'cell_' + y_pos + '_' + x_pos} color={TETRIS_COLORS[+x]} />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}