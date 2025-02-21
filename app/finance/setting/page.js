"use client"

import AddCategoryForm from "@/app/components/setting/AddCategoryFrom"
import { useEffect, useState } from "react"
// import { LoadUserConfig } from "./action"
import { loadUserConfig } from "../dashboard/actions"
import { useAuth } from "../authContext"
import EditForm from "@/app/components/setting/EditForm"
import SpendingLimitConfig from "@/app/components/setting/SpendingConfig"

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
        <div>
            setting page
            <AddCategoryForm type='expend' lists={userConfig.expend} userId={userId} handleEdit={handleEdit}></AddCategoryForm>
            <AddCategoryForm type='income' lists={userConfig.income} userId={userId} handleEdit={handleEdit}></AddCategoryForm>
            {editState ? <EditForm data={editData} id={userId}></EditForm> : ''}
            <SpendingLimitConfig id={userId}></SpendingLimitConfig>
        </div>
    )
}