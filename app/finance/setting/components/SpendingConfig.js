"use client"


import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { useEffect, useState } from "react"
import { ChangeSpendingLimit } from "@/app/finance/setting/action"
import { useAlert } from "@/app/alertContext"

export default function SpendingLimitConfig({ id, limitValue }) {
    const { handleAlert } = useAlert()
    const [spendingVal, setSpendingVal] = useState(limitValue)
    const [checkInputError, setInputError] = useState({
        status: false,
        msg: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target)

            const spendingText = data.get('spending')
            if (spendingText === '') {
                setInputError((prevState) => ({
                    ...prevState,
                    status: true,
                    msg: 'Please fill spending limit !'
                }))
                return
            }
            const response = await ChangeSpendingLimit(id, spendingText)
            if (response.status === 200) {
                handleAlert('success', response.message)
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        setSpendingVal(limitValue)
    }, [limitValue])

    return (
        <Stack gap={2} mt={2}>
            <Typography variant="h6" fontWeight="bold">Set spending limit</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'primary.light' }}>Control your expenses by setting a spending limit </Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" gap={2}>
                    <TextField variant="outlined"
                        type="number"
                        label="spending"
                        name="spending"
                        value={spendingVal}
                        onChange={(e) => setSpendingVal(e.target.value)}
                        error={checkInputError.status}
                        helperText={checkInputError.msg}
                    ></TextField>
                    <Button variant="contained" type="submit" sx={{ borderRadius: '8px', px: 3 }}>Apply</Button>
                </Stack>
            </form>
        </Stack>
    )
}