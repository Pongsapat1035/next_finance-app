"use client"

import AddCategoryForm from "@/app/components/setting/AddCategoryFrom"
import { useEffect, useState } from "react"
import { loadUserConfig } from "../dashboard/actions"
import { useAuth } from "../authContext"
import EditForm from "@/app/components/setting/EditForm"
import SpendingLimitConfig from "@/app/components/setting/SpendingConfig"
import { Grid2, Divider, Typography } from "@mui/material"


export default function SettingPage() {
    const user = useAuth()
    const [userConfig, setUserConfig] = useState({
        expend: [],
        income: [],
        spendingLimit: 10000
    })
    const [userId, setUserId] = useState('')
    const [editData, setEditData] = useState({})
    const [editState, setEditState] = useState(false)

    const fetchData = async (userId) => {
        const response = await loadUserConfig(userId)
        console.log('check response : ', response)
        setUserConfig(response)
    }

    const handleEdit = (data = {}) => {
        setEditState(!editState)
        setEditData(data)
        console.log('check data', data)
    }

    useEffect(() => {
        if (user) {
            // console.log('User id : ', user.uuid)
            setUserId(user.uuid)
            fetchData(user.uuid)
        }
    }, [user])
    // console.log(userConfig)
    return (
        <Grid2 container direction="column" gap={1} mt={5}>
            <Typography variant="h3" fontWeight="bold" >Setting</Typography>
            <Grid2 container direction="column" gap={4}>
                <SpendingLimitConfig id={userId}></SpendingLimitConfig>
                <Divider />
                <AddCategoryForm type='expend' lists={userConfig} userId={userId} handleEdit={handleEdit}></AddCategoryForm>
                {editState ? <EditForm data={editData} id={userId}></EditForm> : ''}
            </Grid2>
        </Grid2>
    )
}