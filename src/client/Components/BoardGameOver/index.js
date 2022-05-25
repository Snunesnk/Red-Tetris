import React from 'react';
import { useSelector } from 'react-redux'
import { Modal, Box } from "@mui/material";
import { Title } from '../Title/styles'
import { ModalStyle } from './styles'

export const BoardGameOverComponent = () => {
    const appState = useSelector(state => state.appState);

    return (
        <Modal
            open={appState.isGameOver}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={ModalStyle}>
                <Title>Game Over :(</Title>
            </Box>
        </Modal>
    );
}