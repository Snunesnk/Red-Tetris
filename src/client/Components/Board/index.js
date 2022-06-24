import React from 'react';
import { useSelector } from 'react-redux'
import { GridContainer } from './styles'
import { CellComponent } from "../Cell/index";
import { OUTER_TETRIS_COLORS, INNER_TETRIS_COLORS, RED_COLOR } from "../../constants";
import { BoardModalComponent } from "../BoardModal/index";
import { BoardInfosComponent } from '../BoardInfos';
import { SpecterComponent } from '../Specters';
import { Grid } from '@mui/material';
export const BoardComponent = () => {
    const stateBoard = useSelector(state => state.stateBoard);
    let y_pos = -1;

    const spanStyle = {
        color: OUTER_TETRIS_COLORS[stateBoard.level - 1 % OUTER_TETRIS_COLORS.length],
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "1em",
    }

    const board = stateBoard.board.map(y => {
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

    const color = stateBoard.level == 0 || stateBoard.level == 1 ? "white" : OUTER_TETRIS_COLORS[stateBoard.level - 1 % OUTER_TETRIS_COLORS.length]
    const BoardContainerStyle = {
        display: "flex",
        justifyContent: "start",
        border: "8px solid #141e30"
    };

    return (
        <Grid container style={{ marginTop: "2em" }}>
            <BoardModalComponent />

            <Grid item xs={4}>
                <SpecterComponent parity={true} />
            </Grid>

            <Grid item xs={4}>
                <Grid container style={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={3} style={{ display: "flex", justifyContent: "end" }}>
                        <BoardInfosComponent score={stateBoard.score} color={color} />
                    </Grid>
                    <Grid item xs={9} style={BoardContainerStyle}>
                        <div style={GridContainer}>
                            {board}
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <SpecterComponent parity={false} />
            </Grid>
        </Grid>
    );
}