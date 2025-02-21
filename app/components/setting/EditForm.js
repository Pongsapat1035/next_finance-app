"use client"
import { Stack, TextField, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { EditCategory } from "@/app/finance/setting/action"

export default function EditForm({ data, id }) {
    const [itemIndex, setItemIndex] = useState(0)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        if (data.data) {
            console.log('recieved lists : ', data)
            const findItemIndex = data.data.findIndex((element) => element === data.item)
            console.log('index get : ', findItemIndex)
            setItemIndex(findItemIndex)
        }
    }, [data])

    const handleSubmit = async () => {
        try {
            const lists = data.data
            lists[itemIndex] = editText
            const response = await EditCategory(data.type, lists, id)
            console.log('response : ', response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Stack gap={2} sx={{ width: '300px', mt: 4 }}>
            <Typography variant="h4">Edit form</Typography>
            <TextField variant="outlined" label="edit" onChange={(e) => setEditText(e.target.value)}></TextField>
            <Button variant="contained" onClick={() => handleSubmit()} >Edit</Button>
        </Stack>
    )
}