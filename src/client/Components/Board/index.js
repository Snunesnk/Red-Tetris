import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LineStyle, ModalStyle } from './styles'
import { CellComponent } from "../Cell/index";
import { TETRIS_COLORS } from "../../constants";
import { BoardModalComponent } from "../BoardModal/index";
import { BoardGameOverComponent } from "../BoardGameOver/index";

export const BoardComponent = () => {
    const boardMap = useSelector(state => (state.map));
    const appState = useSelector(state => state.appState);
    let y_pos = -1;

    const dispatch = useDispatch();

    const board = boardMap.map(y => {
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
    });

    return (
        <div>
            <BoardModalComponent />

            {appState.isGameOver == true &&
                <BoardGameOverComponent />
            }

            {board}
        </div>
    );
}