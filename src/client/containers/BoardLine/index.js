import React from "react";
import { Line } from "./styles";
import { CellComponent } from "../../Components/Cell/index";

export class LineComponent extends React.Component {
    render() {
        let cells = Array.from({length: 10}, _ => (
            <CellComponent></CellComponent>
        ));

        return (
            <Line>
                {cells}
            </Line>
        );
    }
}