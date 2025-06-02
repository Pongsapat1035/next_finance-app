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

import { AddCategory } from "@/app/finance/setting/action";
import { validateText } from "@/app/util/Validation";
import { useAlert } from "@/app/alertContext";
import { useAuth } from "@/app/finance/authContext";

export default function AddCateModal({ modalState, closeModal }) {
    const { user, userConfig, setUserConfig } = useAuth()
    const { handleAlert } = useAlert()
    const [formData, setFormData] = useState({
        type: 'select type',
        category: ''
    })
    const [inputError, setInputError] = useState({
        type: null,
        category: null
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = (data) => {
        const { type, category } = data
        const categoryLists = userConfig[type]
        if (type === 'select type') {
            setInputError((prev) => ({ ...prev, type: "please select type" }))
            throw new Error(`validate fail`)
        }

        const validateResult = validateText(category)
        if (validateResult) {
            setInputError((prev) => ({ ...prev, category: validateResult }))
            throw new Error(`validate fail`)
        }

        const checkDuplicate = categoryLists.includes(category)
        if (checkDuplicate) {
            setInputError((prev) => ({ ...prev, category: `${category} is already exist` }))
            throw new Error(`${category} is already exist`)
        }
    }

    const handleCreateCategory = async () => {
        try {
            setIsLoading(true)
            setInputError((prev) => ({ ...prev, type: null, category: null }))
            validateForm(formData)

            const { type, category } = formData
            const userId = user.uuid
            const categoryLists = userConfig[type]

            await AddCategory(type, category, userId)

            categoryLists.push(category)
            setUserConfig((prev) => ({
                ...prev,
                [type]: categoryLists
            }))
            setFormData((prev) => ({ ...prev, type: 'select type', category: '' }))
            closeModal()
            handleAlert('success', `Create ${category} successful`)
        } catch (error) {
            handleAlert('error', error.message)
            console.log('error from add new category : ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Create category">
            <Stack spacing={2}>
                <Select name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    error={inputError.type}
                    fullWidth>
                    <MenuItem value="select type" disabled>Select type</MenuItem>
                    <MenuItem value="expend">Expend</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                </Select>
                {inputError.type ? <Typography variant="body1" color="error.main" textAlign="right" sx={{ fontSize: '0.75rem', mt: 2 }}>{inputError.type}</Typography> : ''}
                <TextField id="outlined-basic" type="text" name="category" onChange={handleInputChange} error={inputError.category} helperText={inputError.category}
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
                <Button variant="square" loading={isLoading} onClick={handleCreateCategory}>Add category</Button>
            </Stack>
        </ModalBox>
    )
}