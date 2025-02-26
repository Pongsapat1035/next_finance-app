"use client"

import { Stack, TextField, Button, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { ChangeSpendingLimit } from "@/app/finance/setting/action"

export default function SpendingLimitConfig({ id, limitValue }) {
    const [spendingText, setSpendingText] = useState(limitValue)

    const handleSubmit = async () => {
        console.log(typeof (spendingText))
        const response = await ChangeSpendingLimit(id, spendingText)
        console.log(response)
    }

    useEffect(() => {
        setSpendingText(limitValue)
    }, [limitValue])

    return (
        <Stack gap={2} mt={2}>
            <Typography variant="h6" fontWeight="bold">Set spending limit</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'primary.light' }}>Control your expenses by setting a spending limit </Typography>
            <Stack direction="row" gap={2}>
                <TextField variant="outlined" type="text" label="spending" value={spendingText} onChange={(e) => setSpendingText(e.target.value)}></TextField>
                <Button variant="contained" onClick={() => handleSubmit()} sx={{ borderRadius: '8px', px: 3 }}>Apply</Button>
            </Stack>
        </Stack>
    )
}