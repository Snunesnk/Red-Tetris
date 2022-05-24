import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Box } from "@mui/material";
import { Title } from '../Title/styles'
import { ModalStyle } from './styles'

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
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={ModalStyle}>
                <Title>{message}</Title>
            </Box>
        </Modal>
    );
}