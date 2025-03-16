"use client"

import CloseIcon from '@mui/icons-material/Close';
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function ModalBox({ children, state, closeModal, header }) {

    const style = {
        px: 8,
        py: 6,
        borderRadius: '20px',
        bgcolor: "#FFFEFE",
        minWidth: '500px',
        width: 1 / 4,
        position: 'relative'
    }

    return (
        <Modal
            open={state}
            onClose={() => closeModal()}
            aria-labelledby={"modal-modal-" + header}
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none' }}
        >
            <Paper sx={style}>
                <Typography variant="h4" marginBottom="1rem" fontWeight="bold">
                    {header}
                </Typography>
                {children}
                <IconButton aria-label="delete" onClick={() => closeModal()} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </Modal>
    )
}