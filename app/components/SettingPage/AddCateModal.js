"use client"
import ModalBox from "@/app/components/ModalBox"
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function AddCateModal({ modalState, closeModal, submit }) {
    const [data, setData] = useState({
        type: 'select type',
        category: ''
    })
    const [selectTypeError, setSelectTypeError] = useState({
        status: false,
        msg: ' '
    })
    const [textError, setTextError] = useState({
        status: false,
        msg: ' '
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
        setTextError(false)
        setSelectTypeError(false)
        setSelectTypeError((prevState) => ({
            ...prevState,
            status: false,
        }))
        setTextError((prevState) => ({
            ...prevState,
            status: false,
        }))
        if (!checkCateText) {
            setTextError((prevState) => ({
                ...prevState,
                status: true,
                msg: 'Please fill category name'
            }))
            return
        }
        if (type === 'select type') {
            setSelectTypeError((prevState) => ({
                ...prevState,
                status: true,
                msg: 'Please select category type'
            }))
            return
        }

        // console.log('store data')
        submit(type, category)
    }

    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Create category">
            <Stack spacing={2}>
                <Select name="type"
                    value={data.type}
                    onChange={handleTypeChange}
                    error={selectTypeError.status}
                    fullWidth>
                    <MenuItem value="select type" disabled>Select type</MenuItem>
                    <MenuItem value="expend">Expend</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                </Select>
                {selectTypeError.status ? <Typography variant="body1" color="error.main" mt='10px' textAlign="right">{selectTypeError.msg}</Typography> : ''}
                <TextField id="outlined-basic" type="text" name="category" onChange={handleCategoryChange} error={textError.status} helperText={textError.msg}
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