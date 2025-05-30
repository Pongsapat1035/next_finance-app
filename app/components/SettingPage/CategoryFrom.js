"use client"
import { useEffect, useState } from "react"
import { AddCategory, DeleteCategory } from '@/app/finance/setting/action'
import { useAlert } from "@/app/alertContext"
import { useConfirm } from "@/app/confirmContext"
import { useAuth } from "@/app/finance/authContext"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid2 from "@mui/material/Grid2"
import Skeleton from "@mui/material/Skeleton"
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import AddCateModal from "@/app/components/SettingPage/AddCateModal"
import EditCategoryModal from "./EditCategoryModal"

export default function CategoryForm({ lists }) {
    const { handleAlert } = useAlert()
    const { handleConfirm } = useConfirm()
    const { user, userConfig, setUserConfig } = useAuth()
    const skeletoLists = new Array(6).fill('')
    const [isLoading, setIsLoading] = useState(true)
    const [userId, setUserId] = useState("")

    const [addModalState, setAddModalState] = useState(false)
    const [categoryLists, setCategoryLists] = useState({
        expend: [],
        income: []
    })

    const confirmDelete = async (categoryData) => {
        try {
            const { type, category } = categoryData
            const response = await DeleteCategory(type, category, userId)

            const deleteIndex = categoryLists[type].findIndex(el => el === category)
            const deleteList = categoryLists[type]
            deleteList.splice(deleteIndex, 1)

            setUserConfig((prev) => ({ ...prev, type: deleteList }))
            
            const { status, message } = response
            if (status !== 200) throw new Error(message)
            handleAlert("success", message)
        }
        catch (error) {
            console.log(error)
            handleAlert("error", error.message)
        }
    }

    const handleDelete = async (type, category) => {
        const categoryCount = categoryLists[type].length
        if (categoryCount < 2) {
            handleAlert('error', `${type} category must have at least 1 category`)
            return
        }
        handleConfirm("Delete", `Are you want to delete category : ${category}`, () => confirmDelete({ type, category }))
    }

    useEffect(() => {
        if (userConfig) {
            const { expend, income } = userConfig
            setCategoryLists((prev) => ({ ...prev, expend, income }))
            setUserId(user.uuid)
            setIsLoading(false)
        }
    }, [userConfig])

    return (
        <Stack gap={2}>
            <Typography variant="h6" fontWeight="bold">Customize category</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'text.light' }}>
                Create and manage your own income and expense categories to better organize your finances.
            </Typography>
            <Button variant="contained" onClick={() => setAddModalState(true)} sx={{ borderRadius: '8px', maxWidth: '200px' }}>Create category</Button>
            <Grid2 container width={{ xs: '90%', md: '80%' }} gap={{ xs: 1, sm: 0 }} >
                <Grid2 container direction="column" gap={2} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h6" fontWeight="bold">Expend</Typography>
                    {
                        isLoading ?
                            skeletoLists.map((_, index) => <Skeleton key={index} variant="rounded" width={300} height={60} />) :
                            categoryLists.expend.map((item, index) => <CategoryButton key={index} name={item} type="expend" value={{ data: lists.expend, index, name: item, type: 'expend' }} deleteCategory={handleDelete}></CategoryButton>)
                    }
                </Grid2>
                <Grid2 container direction="column" gap={2} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h6" fontWeight="bold">Income</Typography>
                    {
                        isLoading ?
                            skeletoLists.map((_, index) => <Skeleton key={index} variant="rounded" width={300} height={60} />) :
                            categoryLists.income.map((item, index) => <CategoryButton key={index} name={item} type="income" value={{ data: lists.income, index, name: item, type: 'income' }} deleteCategory={handleDelete}></CategoryButton>)
                    }
                </Grid2>
            </Grid2>
            <AddCateModal modalState={addModalState} closeModal={() => setAddModalState(!addModalState)}></AddCateModal>
        </Stack>
    )
}


const CategoryButton = ({ name, type, deleteCategory }) => {
    const [editModalState, setEditModalState] = useState(false)

    const style = {
        width: { xs: '100%', sm: '80%', ms: '60%' },
        px: 2,
        py: '5px',
        borderRadius: 50,
        bgcolor: 'primary.light'
    }

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={style}>
            <Typography variant="body1" fontWeight="bold">{name}</Typography>
            <Stack direction="row" gap={0}>
                <IconButton aria-label="edit" onClick={() => setEditModalState(true)}>
                    <EditRoundedIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => deleteCategory(type, name)}>
                    <DeleteRoundedIcon />
                </IconButton>
            </Stack>
            <EditCategoryModal modalState={editModalState} closeModal={() => setEditModalState(false)} value={{ name, type }}></EditCategoryModal>
        </Stack>
    )
}

