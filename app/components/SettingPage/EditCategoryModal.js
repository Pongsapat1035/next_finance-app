"use client"

import ModalBox from "@/app/components/ModalBox"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

import { useEffect, useState } from "react"
import { useAuth } from "@/app/finance/authContext";
import { useAlert } from "@/app/alertContext";
import { EditCategory } from "@/app/finance/setting/action";
import { validateText } from "@/app/util/Validation"

export default function EditCategoryModal({ modalState, closeModal, value }) {
    const { user, userConfig } = useAuth()
    const { handleAlert } = useAlert()
    const [editData, setEditData] = useState({
        type: '',
        category: ''
    })
    const [categoryIndex, setCategoryIndex] = useState(0)
    const [inputError, setInputError] = useState(null)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEditData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = (data) => {
        const { type, category } = data
        const categoryLists = userConfig[type]

        const validateResult = validateText(category)
        if (validateResult) {
            setInputError(validateResult)
            throw new Error(`validate fail`)
        }

        const checkDuplicate = categoryLists.includes(category)
        if (checkDuplicate) {
            setInputError(`${category} is already exist`)
            throw new Error(`${category} is already exist`)
        }
    }

    const handleEditCategory = async () => {
        try {
            setInputError(null)
            validateForm(editData)

            const { type, category } = editData
            const userId = user.uuid
            const categoryLists = userConfig[type]

            categoryLists[categoryIndex] = category

            const response = await EditCategory(type, categoryLists, userId)
            const { status, message } = response

            if (status !== 200) throw new Error(message)

            handleAlert('success', message)
            closeModal()
        } catch (error) {
            handleAlert('error', error.message)
            console.log('error from edit data : ', error)
        }
    }

    useEffect(() => {
        if (value) {
            const { type, name } = value
            setEditData((prevState) => ({
                ...prevState,
                type: type,
                category: name,
            }))
            const getCateIndex = userConfig[type].findIndex(el => el === name)
            setCategoryIndex(getCateIndex)
        }
    }, [value])

    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Edit">
            <Stack spacing={2}>
                <TextField id="outlined-basic" type="type" name="category" value={editData.type} disabled
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
                <TextField
                    id="outlined-basic" type="text" name="category"
                    variant="outlined" placeholder="Categorty"
                    error={inputError}
                    helperText={inputError}
                    value={editData.category} onChange={handleChange}
                    required
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryRoundedIcon />
                                </InputAdornment>
                            ),
                        },
                    }}>
                </TextField>
                <Button variant="square" onClick={() => handleEditCategory()}>Update category</Button>
            </Stack>
        </ModalBox>
    )
}
