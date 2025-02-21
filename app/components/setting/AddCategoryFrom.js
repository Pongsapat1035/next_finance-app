"use client"
import { Stack, Typography, TextField, Button, Box } from "@mui/material"
import { useState } from "react"
import { AddCategory, DeleteCategory } from '@/app/finance/setting/action'

export default function AddCategoryForm({ type, lists, userId, handleEdit }) {
    const [categoryText, setCategoryText] = useState("")
    // console.log('recieved lists : ', lists)
    const handleClick = async () => {
        // console.log(categoryText)
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
            <Typography variant="h4">Category lists</Typography>
            <Stack direction="row" gap={2}>
                <TextField id="standard-basic" label="New category" variant="standard" onChange={(e) => setCategoryText(e.target.value)} />
                <Button variant="contained" onClick={handleClick}>Add</Button>
            </Stack>
            {
                lists.map((item, index) => {
                    return <Stack direction="row" justifyContent="space-between" gap={2} key={index} sx={{ width: '300px' }}>
                        <Typography variant="body1">{item}</Typography>
                        <Stack direction="row" gap={1}>
                            <Button variant="outlined" onClick={() => handleEdit({ data: lists, item: item, type: type })}>Edit</Button>
                            <Button variant="outlined" onClick={() => handleDelete(item)}>Delete</Button>
                        </Stack>
                    </Stack>
                })
            }
        </Stack>
    )
}