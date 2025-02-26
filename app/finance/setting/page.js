"use client"

import CategoryForm from "@/app/finance/setting/components/CategoryFrom"
import { useEffect, useState } from "react"
import { loadUserConfig } from "../dashboard/actions"
import { useAuth } from "../authContext"
import SpendingLimitConfig from "@/app/finance/setting/components/SpendingConfig"
import { Grid2, Divider, Typography, Box } from "@mui/material"

import { auth } from "@/app/firebase"

export default function SettingPage() {
    const user = useAuth()
    const [userConfig, setUserConfig] = useState({
        expend: [],
        income: [],
        spendingLimit: 0
    })
    const [userId, setUserId] = useState('')

    const fetchData = async (userId) => {
        const response = await loadUserConfig(userId)
        console.log('check response : ', response)
        setUserConfig(response)
    }

    useEffect(() => {
        if (user) {
            setUserId(user.uuid)
            fetchData(user.uuid)
        }
        
    }, [user])
    console.log('check user config : ', userConfig)
    const testCreateNewToken = async () => {
        const checkUser = await auth.currentUser.getIdToken(true)
        console.log('check result', checkUser)
    }
    return (
        <Grid2 container direction="column" gap={1} mt={5}>
            <Typography variant="h3" fontWeight="bold" >Setting</Typography>
            <Grid2 container direction="column" gap={4}>
                <SpendingLimitConfig id={userId} limitValue={userConfig.spendingLimit}></SpendingLimitConfig>
                <Divider />
                <CategoryForm lists={userConfig} userId={userId}></CategoryForm>
            </Grid2>
            <button onClick={()=> testCreateNewToken()}>get new token</button>
        </Grid2>
    )
}