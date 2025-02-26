"use client"

import ModalBox from "./ModalBox"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export default function ConfirmDeleteModal({ state, closeState, header, action }) {

    return (
        <ModalBox state={state} header={header} closeModal={closeState} >
            <Stack spacing={3}>
                <Typography variant="body1">Are you sure you want to delete this item </Typography>
                <Stack direction="row" gap={2}>
                    <Button variant="contained" sx={{ px: 2, py: '0px', bgcolor: 'error.main' }} onClick={() => action()}>Delete</Button>
                    <Button variant="contained" sx={{ px: 2, bgcolor: 'background.base', color: 'primary.main' }}>Cancel</Button>
                </Stack>
            </Stack>
        </ModalBox>
    )
}