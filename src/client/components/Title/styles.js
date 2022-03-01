import styled from "styled-components";
import {
    WHITE_COLOR,
    RED_COLOR
} from "../../constants/colors";

export const TitleContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`

export const Title = styled.div`
color: ${RED_COLOR};
font-family: "Share Tech Mono", monospace;
text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
font-size: 4.2em;
`