import React from 'react';
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import { CenteredContainer, GridContainer, InfosContainer } from './styles';
import { INNER_TETRIS_COLORS, OUTER_TETRIS_COLORS, WHITE_COLOR } from '../../constants';
import { CellComponent } from '../Cell';


export const BoardInfosComponent = ({ score, level }) => {
    const stateBoard = useSelector(state => state.stateBoard);
    const color = level == 0 ? "black" : OUTER_TETRIS_COLORS[level - 1 % OUTER_TETRIS_COLORS.length]
    let y_pos = -1;

    const next_pieces = stateBoard.nextPieces.map(y => {
        y_pos++;

        let x_pos = -1;
        return (
            y.map(x => {
                let innerColor;
                let outerColor;

                innerColor = INNER_TETRIS_COLORS[+x];
                outerColor = OUTER_TETRIS_COLORS[+x];

                // Do not show inner color for "dead" cells
                if (x == 0) {
                    innerColor = "black";
                    outerColor = "black";
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

    const containerStyle = {
        border: "7px solid " + color,
        padding: "0.3em"
    };

    return (
        <div style={InfosContainer}>
            <div style={containerStyle}>
                <div>
                    <div style={CenteredContainer}>
                        score
                    </div>
                    <div style={CenteredContainer}>
                        <span style={{ color: color }}>{score}</span>
                    </div >
                </div>
                <div style={{ marginTop: "2em" }}>
                    <div style={CenteredContainer}>
                        Next
                    </div>
                    <div style={CenteredContainer}>
                        pieces
                    </div>
                    <div style={CenteredContainer}>
                        <div style={GridContainer}>
                            {next_pieces}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}