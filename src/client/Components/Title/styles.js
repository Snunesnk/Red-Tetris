import styled from "styled-components";
import {
    RED_COLOR
} from "../../constants";

export const Title = styled.div`
color: ${RED_COLOR};
text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.45);
font-size: 4rem;
margin-top: 0.3em;
line-height: 1.3em;
`

export const CenteredContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    width: "100%"
}