import React from "react";
import { useSelector } from "react-redux";

export const SpecterComponent = () => {
    let boards = useSelector(state => state.appState.room);

    return (
        <div>

        </div>
    );
}
