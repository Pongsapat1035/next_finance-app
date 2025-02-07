"use client"
import { Paper, Typography, Grid2, Button, IconButton } from "@mui/material"
import { Close, Done } from '@mui/icons-material';
import { useState, useEffect } from "react";

export default function AlertBadge({ state, type, msg }) {
    const [openState, setOpenState] = useState(false)
    const symbol = type === 'error' ? <Close sx={{ color: "#C72424" }}></Close> : <Done sx={{ color: "#5AAE25" }}></Done>

    useEffect(() => {
        if (state === true) {
            setOpenState(true)
            setTimeout(() => setOpenState(false), 3000)
        }
    }, [state])

    const bgSymbol = type === 'error' ? "#FFF2F2" : "#E5F8D6"

    const symbolStyle = {
        borderRadius: '100%',
        bgcolor: bgSymbol,
        width: 50,
        height: 50
    }

    const closeBtnStyle = {
        position: "absolute",
        top: 10,
        right: 10,
        cursor: "pointer",
        minWidth: 0,
        width: 30,
        height: 30,
        borderRadius: "50%"
    }
    return (
        <>
            {
                openState === true ? (<Paper elevation={0} sx={{ width: 1 / 4, borderRadius: 5, p: 3, position: "fixed", bottom: 30, right: 20 }}>
                    <Grid2 container alignItems="center" spacing={4}>
                        <Grid2 size={2}>
                            <Grid2 container justifyContent="center" alignItems="center" sx={symbolStyle}>
                                {symbol}
                            </Grid2>
                        </Grid2>
                        <Grid2 size={10}>
                            <Typography variant="h5" fontWeight="bold">{type === 'error' ? 'Error' : 'Success'}</Typography>
                            <Typography variant="body1">{msg}</Typography>
                        </Grid2>
                    </Grid2>
                    <IconButton onClick={() => setOpenState(false)} size="small" sx={{ position: 'absolute', top: 10, right: 10 }} >
                        <Grid2 container justifyContent="center" alignItems="center">
                            <Close></Close>
                        </Grid2>
                    </IconButton>
                </Paper>) : ''
            }

        </>

    )
}