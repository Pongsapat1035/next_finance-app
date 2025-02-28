"use client"

import ModalBox from "./ModalBox"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export default function ConfirmModal({ state, closeState, header, action }) {

    return (
        <ModalBox state={state} header={header} closeModal={closeState} >
            <Stack spacing={3}>
                <Typography variant="body1">
                    {
                        header === 'Delete' ?
                            "Are you sure you want to delete this item" :
                            "Leaving so soon? Are you sure you want to sign out?"
                    }
                </Typography>
                <Stack direction="row" gap={2}>
                    <Button variant="contained" sx={{ px: 2, py: '0px', bgcolor: 'error.main' }} onClick={() => action()}>Confirm</Button>
                    <Button variant="contained" sx={{ px: 2, bgcolor: 'background.base', color: 'primary.main' }} onClick={() => closeState()}>Cancel</Button>
                </Stack>
            </Stack>
        </ModalBox>
    )
}