"use client"

import CategoryForm from "@/app/finance/setting/components/CategoryFrom"
import { useEffect, useState } from "react"
import { loadUserConfig } from "../dashboard/actions"
import { useAuth } from "../authContext"
import SpendingLimitConfig from "@/app/finance/setting/components/SpendingConfig"
import { Grid2, Divider, Typography } from "@mui/material"
import Skeleton from '@mui/material/Skeleton'

export default function SettingPage() {
    const user = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [userConfig, setUserConfig] = useState({
        expend: [],
        income: [],
        spendingLimit: 0
    })
    const [userId, setUserId] = useState('')

    const fetchData = async (userId) => {
        const response = await loadUserConfig(userId)
        setUserConfig(response)
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            setUserId(user.uuid)
            fetchData(user.uuid)
        }
    }, [user])

    return (
        <Grid2 container direction="column" gap={1} my={5} p={8} sx={{ bgcolor: 'background.paper', borderRadius: '30px' }}>
            <Typography variant="h3" fontWeight="bold" >Setting</Typography>
            <Grid2 container direction="column" gap={4}>
                <SpendingLimitConfig id={userId} limitValue={userConfig.spendingLimit}></SpendingLimitConfig>
                <Divider />
                <CategoryForm isLoading={isLoading} lists={userConfig} userId={userId}></CategoryForm>
            </Grid2>
        </Grid2>
    )
}

