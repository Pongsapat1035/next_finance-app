"use client"

import { Stack, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import { ChangeSpendingLimit } from "@/app/finance/setting/action"

export default function SpendingLimitConfig({ id }) {
    const [spendingText, setSpendingText] = useState(0)

    const handleSubmit = async () => {
        console.log(typeof(spendingText))
        const response = await ChangeSpendingLimit(id, spendingText)
        console.log(response)
    }

    return (
        <Stack gap={2} mt={2} width="300px">
            <Typography variant="h4">Spending limit config</Typography>
            <TextField variant="outlined" type="number" label="spending"  onChange={(e) => setSpendingText(e.target.value)}></TextField>
            {/* <TextField variant="outlined" label="edit" onChange={(e) => setEditText(e.target.value)}></TextField> */}

            <Button variant="contained" onClick={() => handleSubmit()}>Apply</Button>
        </Stack>
    )
}