import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { LineStyle } from './styles'
import { CellComponent } from "../Cell/index";
=======
import { BoardStyle, LineStyle } from './styles'
import { CellComponent } from "../../Components/Cell/index";
>>>>>>> fb14901ce9a92cfd8b00bdb5cd817c7c06211e8d
import { TETRIS_COLORS } from "../../constants";

export const BoardComponent = () => {
    const boardMap = useSelector(state => (state.map));
    let y_pos = -1;

    const dispatch = useDispatch();

    return (
<<<<<<< HEAD
        <div>
=======
        <div style={BoardStyle}>
>>>>>>> fb14901ce9a92cfd8b00bdb5cd817c7c06211e8d
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
<<<<<<< HEAD
=======
                                            id={'cell_' + y_pos + '_' + x_pos}
>>>>>>> fb14901ce9a92cfd8b00bdb5cd817c7c06211e8d
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