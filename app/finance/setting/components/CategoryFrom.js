"use client"
import { Stack, Typography, TextField, Button, Box, Grid2, Modal } from "@mui/material"
import { useState } from "react"
import { AddCategory, DeleteCategory, EditCategory } from '@/app/finance/setting/action'
import AddCateModal from "@/app/finance/setting/components/AddCateModal"

import EditCategoryModal from "./EditCategoryModal"
import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal"

export default function CategoryForm({ lists, userId, handleEditMoal }) {
    const [categoryText, setCategoryText] = useState("")
    const [modalState, setModalState] = useState(false)
    const [addModalState, setAddModalState] = useState(false)

    const handleCreateCategory = async (type, category) => {
        try {
            const response = await AddCategory(type, category, userId)
            console.log('response from add category : ', response)
            setAddModalState(false)
            alert('edit success !')
        } catch (error) {
            console.log('error from add new category : ', error)
        }
    }



    const handleDelete = async (type, item) => {
        try {
            console.log('recieved item : ', item)
            const response = await DeleteCategory(type, item, userId)
            alert('delete success')
            window.location.reload()
            console.log('response from add category : ', response)
        } catch (error) {
            console.log('error from add new category : ', error)
        }
    }



    return (
        <Stack gap={2}>
            <Typography variant="h6" fontWeight="bold">Customize category</Typography>
            <Typography variant="body1" fontWeight="light" sx={{ color: 'primary.light' }}>
                Create and manage your own income and expense categories to better organize your finances.
            </Typography>
            <Button variant="contained" onClick={() => setAddModalState(true)} sx={{ borderRadius: '8px', maxWidth: '200px' }}>Create category</Button>
            <Grid2 container width="80%">
                <Grid2 container direction="column" gap={2} size={6}>
                    <Typography variant="h6" fontWeight="bold">Expend</Typography>
                    {
                        lists.expend.map((item, index) => <CategoryButton key={index} name={item} value={{ data: lists.expend, index, name: item, type: 'expend' }} deleteCategory={handleDelete}></CategoryButton>)
                    }
                </Grid2>
                <Grid2 container direction="column" gap={2} size={6}>
                    <Typography variant="h6" fontWeight="bold">Income</Typography>
                    {
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
    const confirmDelete = () => deleteCategory(value.type, value.name)
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '60%', px: 2, py: '5px', borderRadius: 50, bgcolor: 'background.base' }}>
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

