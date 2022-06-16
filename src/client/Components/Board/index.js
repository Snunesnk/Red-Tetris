import React from 'react';
import { useSelector } from 'react-redux'
import { LineStyle } from './styles'
import { CellComponent } from "../Cell/index";
import { OUTER_TETRIS_COLORS, INNER_TETRIS_COLORS } from "../../constants";
import { BoardModalComponent } from "../BoardModal/index";
export const BoardComponent = () => {
    const stateBoard = useSelector(state => state.stateBoard);
    let y_pos = -1;

    const board = stateBoard.board.map(y => {
        y_pos++;

        let x_pos = -1;
        return (
            <div key={'line_' + y_pos} style={LineStyle}>
                {
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
                }
            </div>
        )
    });

    return (
        <div>
            <BoardModalComponent />

            score: {stateBoard.score}

            {board}
        </div>
    );
}