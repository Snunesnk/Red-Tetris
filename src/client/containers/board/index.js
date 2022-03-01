import React from "react";
import { Board } from "./styles";
import { LineComponent } from "../BoardLine/index";

export class BoardComponent extends React.Component {
    render() {
        let lines = Array.from({length: 20}, _ => (
            <LineComponent></LineComponent>
        ));

        return (
            <Board>
                {lines}
            </Board>
        );
    }
}