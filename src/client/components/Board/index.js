import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { BoardStyle, LineStyle } from './styles'
import { CellComponent } from "../../Components/Cell/index";
import { TETRIS_COLORS } from "../../constants";

export const BoardComponent = () => {
    const boardMap = useSelector(state => (state.map));
    let y_pos = -1;

    const dispatch = useDispatch();

    return (
        <div style={BoardStyle}>
            {
                boardMap.map(y => {
                    y_pos++;

                    let x_pos = -1;
                    return (
                        <div key={'line_' + y_pos} style={LineStyle}>
                            {
                                y.map(x => {
                                    x_pos++;

                                    return (
                                        <CellComponent
                                            key={'cell_' + y_pos + '_' + x_pos}
                                            x_pos={x_pos}
                                            y_pos={y_pos}
                                            dispatch={dispatch}
                                            id={'cell_' + y_pos + '_' + x_pos}
                                            color={TETRIS_COLORS[+x]}
                                        />
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