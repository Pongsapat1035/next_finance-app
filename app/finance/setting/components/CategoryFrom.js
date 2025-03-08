"use client"
import { Stack, Typography, Button, Grid2 } from "@mui/material"
import { useState } from "react"
import { AddCategory, DeleteCategory } from '@/app/finance/setting/action'
import AddCateModal from "@/app/finance/setting/components/AddCateModal"

import EditCategoryModal from "./EditCategoryModal"
import ConfirmDeleteModal from "@/app/components/ConfirmModal"
import { useAlert } from "@/app/alertContext"
import Skeleton from "@mui/material/Skeleton"

export default function CategoryForm({ isLoading, lists, userId }) {

    const { handleAlert } = useAlert()
    const [addModalState, setAddModalState] = useState(false)
    const skeletoLists = new Array(4).fill('')
    const handleCreateCategory = async (type, category) => {
        try {
            const response = await AddCategory(type, category, userId)
            console.log('response from add category : ', response)
            setAddModalState(false)

            handleAlert('success', `Create ${category} successful`)
            setTimeout(() => window.location.reload(), 1000)
        } catch (error) {
            console.log('error from add new category : ', error)
        }
    }

    const handleDelete = async (type, item) => {
        try {
            console.log('recieved item : ', item)
            const response = await DeleteCategory(type, item, userId)
            // alert('delete success')

            handleAlert('success', `Delete ${item} successful`)
            // window.location.reload()
            setTimeout(() => window.location.reload(), 1000)
            console.log('response from add category : ', response)
        } catch (error) {
            console.log('error from add new category : ', error)
        }
    }


    return (
        <Stack gap={2}>
            <Typography variant="h6" fontWeight="bold">Customize category</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'text.light' }}>
                Create and manage your own income and expense categories to better organize your finances.
            </Typography>
            <Button variant="contained" onClick={() => setAddModalState(true)} sx={{ borderRadius: '8px', maxWidth: '200px' }}>Create category</Button>
            <Grid2 container width="80%">
                <Grid2 container direction="column" gap={2} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h6" fontWeight="bold">Expend</Typography>
                    {
                        isLoading ?
                            skeletoLists.map((item, index) => <Skeleton key={index} variant="rounded" width={230} height={60} />) :
                            lists.expend.map((item, index) => <CategoryButton key={index} name={item} value={{ data: lists.expend, index, name: item, type: 'expend' }} deleteCategory={handleDelete}></CategoryButton>)
                    }
                </Grid2>
                <Grid2 container direction="column" gap={2} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h6" fontWeight="bold">Income</Typography>
                    {
                        isLoading ?
                            skeletoLists.map((item, index) => <Skeleton key={index} variant="rounded" width={230} height={60} />) :
                            lists.income.map((item, index) => <CategoryButton key={index} name={item} value={{ data: lists.income, index, name: item, type: 'income' }} deleteCategory={handleDelete}></CategoryButton>)
                    }
                </Grid2>
            </Grid2>
            <AddCateModal modalState={addModalState} submit={handleCreateCategory} closeModal={() => setAddModalState(!addModalState)}></AddCateModal>
        </Stack>
    )
}

import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CategoryButton = ({ name, type, value, deleteCategory }) => {
    const [editModalState, setEditModalState] = useState(false)
    const [confirmDelState, setConfirmDelState] = useState(false)
    const confirmDelete = () => {
        setConfirmDelState(false)
        deleteCategory(value.type, value.name)
    }
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
                <IconButton aria-label="edit" onClick={() => setConfirmDelState(true)}>
                    <DeleteRoundedIcon />
                </IconButton>
            </Stack>
            <EditCategoryModal modalState={editModalState} closeModal={() => setEditModalState(false)} value={value}></EditCategoryModal>
            <ConfirmDeleteModal state={confirmDelState} closeState={() => setConfirmDelState(false)} header="Delete category" action={confirmDelete}></ConfirmDeleteModal>
        </Stack>
    )
}

