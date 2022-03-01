import styled from "styled-components";
import {
    WHITE_COLOR,
    RED_COLOR
} from "../../Constants/colors";

export const Cell = styled.div`
    min-height: 15px;
    min-width: 15px;
    background-color: ${WHITE_COLOR};
    padding: 0.1em;
    border: 1px solid black;
`;
export const InnerCell = styled.div`
    background-color: ${RED_COLOR};
    padding: 0.9em;
`