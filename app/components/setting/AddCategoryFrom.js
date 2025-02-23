"use client"
import { Stack, Typography, TextField, Button, Box, Grid2, Modal } from "@mui/material"
import { useState } from "react"
import { AddCategory, DeleteCategory } from '@/app/finance/setting/action'
import AddCateModal from "@/app/components/setting/AddCateModal"

import EditCategoryModal from "./EditCategoryModal"

export default function AddCategoryForm({ type, lists, userId, handleEdit }) {
    const [categoryText, setCategoryText] = useState("")
    const [modalState, setModalState] = useState(false)
    const [addModalState, setAddModalState] = useState(false)

    const handleClick = async () => {
        try {
            const response = await AddCategory(type, categoryText, userId)
            console.log('response from add category : ', response)
        } catch (error) {
            console.log('error from add new category : ', error)
        }
    }
    const handleDelete = async (item) => {
        try {
            const response = await DeleteCategory(type, item, userId)
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
                        lists.expend.map((item, index) => <CategoryButton key={index} name={item}></CategoryButton>)
                    }
                </Grid2>
                <Grid2 container direction="column" gap={2} size={6}>
                    <Typography variant="h6" fontWeight="bold">Income</Typography>
                    {
                        lists.income.map((item, index) => <CategoryButton key={index} name={item}></CategoryButton>)
                    }
                </Grid2>
            </Grid2>
            {/* <Button variant="contained" onClick={() => setModalState(true)}>Toggle modal</Button> */}
            <EditCategoryModal modalState={modalState} closeModal={() => setModalState(false)}></EditCategoryModal>
            <AddCateModal modalState={addModalState} closeModal={() => setAddModalState(false)}></AddCateModal>
        </Stack>
    )
}

import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const CategoryButton = ({ name }) => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '60%', px: 2, py: '5px', borderRadius: 50, bgcolor: 'background.base' }}>
            <Typography variant="body1" fontWeight="bold">{name}</Typography>
            <IconButton aria-label="edit">
                <EditRoundedIcon />
            </IconButton>
        </Stack>
    )
}

