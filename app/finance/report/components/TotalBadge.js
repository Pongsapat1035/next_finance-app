"use client"
import { Box, Stack, Typography } from "@mui/material"

export default function TotalBadge({ type, value }) {
    return (
        <Stack spacing={1} sx={{ bgcolor: 'primary.light', p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" color="text.light">Total. {type}</Typography>
            <Typography variant="h5" fontWeight="bold" color="text.primary">THB {value}</Typography>
        </Stack>
    )

}