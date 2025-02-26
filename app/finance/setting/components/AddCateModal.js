"use client"
import ModalBox from "../../../components/ModalBox"
import { Stack, Select, MenuItem, TextField, Button } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { useState } from "react";

export default function AddCateModal({ modalState, closeModal, submit }) {
    const [data, setData] = useState({
        type: 'select type',
        category: ''
    })
    const handleTypeChange = (event) => {
        setData(prevState => ({
            ...prevState,
            type: event.target.value
        }))
    }

    const handleCategoryChange = (event) => {
        setData(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }



    const handleSubmit = () => {
        const { type, category } = data
        const categoryRex = /^[A-Za-z\s]+$/
        const checkCateText = categoryRex.test(category)
        console.log('regular check : ', checkCateText)

        if (!checkCateText) {
            // error msg
            console.log('please fill with currect format')
            return
        }
        console.log('store data')
        submit(type, category)
    }

    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Create category">
            <Stack spacing={2}>
                <Select name="type" value={data.type} onChange={handleTypeChange} fullWidth>
                    <MenuItem value="select type" disabled>Select type</MenuItem>
                    <MenuItem value="expend">Expend</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                </Select>
                <TextField id="outlined-basic" type="text" name="category" onChange={handleCategoryChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryRoundedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined" placeholder="Categorty" required>
                </TextField>
                <Button variant="square" onClick={handleSubmit}>Add category</Button>
            </Stack>
        </ModalBox>
    )
}