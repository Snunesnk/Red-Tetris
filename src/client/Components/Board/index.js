import React from 'react';
import store from '../../Store/store';
import { useSelector, useDispatch } from 'react-redux'
import { LineStyle } from './styles'
import { CellComponent } from "../Cell/index";
import { TETRIS_COLORS } from "../../constants";

export const BoardComponent = () => {
    console.log(store.getState());
    const boardMap = useSelector(state => (state.map));
    let y_pos = -1;

    const dispatch = useDispatch();

    return (
        <div>
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