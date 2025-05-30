"use client"
import { useEffect, useState } from "react"
import { ChangeSpendingLimit } from "@/app/finance/setting/action"
import { useAlert } from "@/app/alertContext"
import { useAuth } from "@/app/finance/authContext"
import { validateNumber } from "@/app/util/Validation"

import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Skeleton from "@mui/material/Skeleton"

export default function SpendingLimitConfig() {
    const { handleAlert } = useAlert()
    const { user, userConfig, setUserConfig } = useAuth()
    const [spendingVal, setSpendingVal] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validateResult = validateNumber(spendingVal)
            if (validateResult) {
                setErrorMsg(validateResult)
                throw new Error("Please fill spending value with corrrect format")
            }
            setErrorMsg(null)
            const userId = user.uuid
            const response = await ChangeSpendingLimit(userId, spendingVal)
            if (response.status !== 200) throw new Error(response.message)

            handleAlert('success', response.message)
            setUserConfig((prev) => ({ ...prev, spendingLimit: spendingVal }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const { spendingLimit } = userConfig
        if (spendingLimit !== 0) {
            setSpendingVal(spendingLimit)
            setIsLoading(false)
        }
    }, [userConfig])

    return (
        <Stack gap={2} mt={2}>
            <Typography variant="h6" fontWeight="bold">Set spending limit</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'text.light' }}>Control your expenses by setting a spending limit </Typography>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" gap={2}>
                    {
                        isLoading ? <Skeleton variant="rounded" width={240} height={60}></Skeleton>
                            :
                            <TextField variant="outlined"
                                type="number"
                                label="spending"
                                name="spending"
                                value={spendingVal}
                                onChange={(e) => setSpendingVal(e.target.value)}
                                error={errorMsg}
                                helperText={errorMsg}
                            ></TextField>
                    }
                    <Button variant="contained" type="submit" sx={{ borderRadius: '8px', px: 3 }}>Apply</Button>
                </Stack>
            </form>
        </Stack>
    )
}