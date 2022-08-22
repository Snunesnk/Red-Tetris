import React from 'react';
import { useSelector } from 'react-redux'
import {
    CenteredContainer,
    GridContainer,
    InfosContainer,
    CenteredTitleContainer,
    ControlsTextContainer,
    ControlHeaders
} from './styles';
import {
    INNER_TETRIS_COLORS,
    OUTER_TETRIS_COLORS,
    WHITE_COLOR
} from '../../constants';
import { CellComponent } from '../Cell';


export const BoardHoldComponent = ({ color }) => {
    const stateBoard = useSelector(state => state.stateBoard);
    let y_pos = -1;

    const piece_hold = stateBoard.pieceHold.map(y => {
        y_pos++;

        let x_pos = -1;
        return (
            y.map(x => {
                let innerColor;
                let outerColor;

                innerColor = INNER_TETRIS_COLORS[+x % INNER_TETRIS_COLORS.length];
                outerColor = OUTER_TETRIS_COLORS[+x % OUTER_TETRIS_COLORS.length];

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
        padding: "0.3em",
        backgroundColor: "black",
        width: "10vh",
        fontSize: "1.25vh"
    };

    const controlsContainer = {
        border: "7px solid " + color,
        padding: "0.3em",
        backgroundColor: "black",
        fontSize: "0.85vh"
    };


    return (
        <div>
            <div style={InfosContainer}>
                <div style={containerStyle}>
                    <div style={CenteredTitleContainer}>
                        Hold
                    </div>
                    <div style={CenteredContainer}>
                        <div style={GridContainer}>
                            {piece_hold}
                        </div>
                    </div>
                </div>
            </div >

            <div style={InfosContainer}>
                <div style={controlsContainer}>
                    <div style={ControlsTextContainer}>
                        <p>
                            <span><b style={ControlHeaders}>Left:</b> Move left</span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>Right:</b> Move right</span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>Up:</b> Rotate clockwise</span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>Z:</b> Rotate counter-clockwise</span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>Down:</b> Soft drop</span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>Space:</b> Hard drop </span><br /><br />
                            <br />
                            <span><b style={ControlHeaders}>C:</b> Hold piece</span>
                            <br />
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}