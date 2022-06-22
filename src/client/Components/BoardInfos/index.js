import React from 'react';
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import { CenteredContainer, GridContainer } from './styles';
import { INNER_TETRIS_COLORS, OUTER_TETRIS_COLORS } from '../../constants';
import { CellComponent } from '../Cell';


export const BoardInfosComponent = ({ score, level }) => {
    const stateBoard = useSelector(state => state.stateBoard);
    const color = OUTER_TETRIS_COLORS[level - 1 % OUTER_TETRIS_COLORS.length]
    let y_pos = -1;

    const next_pieces = stateBoard.nextPieces.map(y => {
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

    return (
        <div>
            <div style={CenteredContainer}>
                score
            </div>
            <div style={CenteredContainer}>
                <span style={{ color: color }}>{score}</span>
            </div >
            <div style={CenteredContainer}>
                Next pieces
            </div>
            <div style={CenteredContainer}>
                <div style={GridContainer}>
                    {next_pieces}
                </div>
            </div>
        </div>
    );
}