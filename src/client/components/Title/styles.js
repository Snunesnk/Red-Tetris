import styled from "styled-components";
import {
    WHITE_TEXT_COLOR,
    RED_TEXT_COLOR
} from "../../constants/colors";

export const TitleContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`

export const Title = styled.div`
color: ${RED_TEXT_COLOR};
font-family: "Share Tech Mono", monospace;
text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
font-size: 4.2em;
`