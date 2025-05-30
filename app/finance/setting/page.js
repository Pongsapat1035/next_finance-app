"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/app/finance/authContext"

import CategoryForm from "@/app/components/SettingPage/CategoryFrom"
import SpendingLimitConfig from "@/app/components/SettingPage/SpendingConfig"
import Grid2 from "@mui/material/Grid2"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

export default function SettingPage() {
    const { user, userConfig } = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (user) {
            setUserId(user.uuid)
            setIsLoading(false)
        }
    }, [user])

    return (
        <Box py={2}>
            <Grid2 container direction="column" gap={1} p={{ xs: 4, md: 8 }} sx={{ bgcolor: 'background.paper', borderRadius: '30px', height: "100%" }}>
                <Typography variant="h3" fontWeight="bold" >Setting</Typography>
                <Grid2 container direction="column" gap={4}>
                    <SpendingLimitConfig></SpendingLimitConfig>
                    <Divider />
                    <CategoryForm isLoading={isLoading} lists={userConfig} userId={userId}></CategoryForm>
                </Grid2>
            </Grid2>
        </Box>
    )
}

