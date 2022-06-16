import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Box, Grid } from "@mui/material";
import { ModalStyle, CenteredContainer, ModalMessage } from './styles'

export const BoardModalComponent = () => {
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState("");
    const appState = useSelector(state => state.appState);


    useEffect(() => {
        const baseTime = 1000;

        setTimeout(() => { setMessage("Ready ?"); }, baseTime);
        setTimeout(() => { setMessage("Steady ?"); }, baseTime * 2);
        setTimeout(() => { setMessage("Go !!"); }, baseTime * 3);
        setTimeout(() => {
            setOpen(false);
            dispatch({ type: "game:tetrisStart", roomName: appState.roomName, playerName: appState.playerName })
        }, baseTime * 4);

    }, []);

    const dispatch = useDispatch();

    return (
        <Modal
            open={open || appState.isGameOver}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={ModalStyle}>
                <Grid container style={CenteredContainer}>
                    {!appState.isGameOver && message.length > 0 && (
                        <Grid item xs={12} style={ModalMessage}>
                            {message}
                        </Grid>
                    )}
                    {appState.isGameOver && (
                        <Grid item xs={12} style={ModalMessage}>
                            Game Over :(
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Modal>
    );
}