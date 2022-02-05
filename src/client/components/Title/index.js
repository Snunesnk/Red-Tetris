import React from "react";
import {
    Title,
    TitleContainer
} from "./styles";

export const TitleComponent = ({
    text
}) => (
    <TitleContainer>
        <Title>{text}</Title>
    </TitleContainer>
);