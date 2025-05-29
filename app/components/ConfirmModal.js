"use client"
import { useAlert } from "../alertContext"
import { useRouter } from "next/navigation"

import ModalBox from "./ModalBox"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

export default function ConfirmModal({ state, closeState, header, description, action }) {
    const  { handleAlert } = useAlert()
    const router = useRouter()

    const handleSubmit = async () => {
        const response = await action()
        if(response.status === 200) {
            handleAlert("success", response.msg)
            router.push(response.redirectUrl)
        }
        closeState()
    }
    return (
        <ModalBox state={state} header={header} closeModal={closeState} >
            <Stack spacing={3}>
                <Typography variant="body1">
                    {description}
                </Typography>
                <Stack direction="row" gap={2}>
                    <Button variant="contained" sx={{ px: 2, py: '0px', bgcolor: 'error.main' }} onClick={handleSubmit}>Confirm</Button>
                    <Button variant="contained" sx={{ px: 2, bgcolor: 'background.base', color: 'primary.main' }} onClick={() => closeState()}>Cancel</Button>
                </Stack>
            </Stack>
        </ModalBox>
    )
}