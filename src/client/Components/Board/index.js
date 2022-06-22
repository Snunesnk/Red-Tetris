import React from 'react';
import { useSelector } from 'react-redux'
import { GridContainer } from './styles'
import { CellComponent } from "../Cell/index";
import { OUTER_TETRIS_COLORS, INNER_TETRIS_COLORS } from "../../constants";
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

    return (
        <Grid container style={{ marginTop: "2em" }}>
            <Grid item xs={12}>
                <BoardModalComponent />
            </Grid>


            <Grid item xs={3} style={{ display: "flex", justifyContent: "end" }}>
                <BoardInfosComponent score={stateBoard.score} level={stateBoard.level} />
            </Grid>
            <Grid item xs={9} xl={5} style={{ display: "flex", justifyContent: "start", paddingLeft: "1em" }}>
                <div style={GridContainer}>
                    {board}
                </div>
            </Grid>
            <Grid item xs={12} xl={4}>
                <SpecterComponent />
            </Grid>
        </Grid>
    );
}