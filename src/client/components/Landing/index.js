import React from "react";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import { MainInputStyle, MainInputContainerStyle } from "./styles";

export const LandingComponent = () => {
    return (
        <div style={MainInputStyle}>
            <div style={MainInputContainerStyle}>
                <TextField
                    label="Enter your pseudo ..."
                    variant="standard"
                    fullWidth
                >
                    Coucou
                </TextField>
            </div>
        </div>
    );
}