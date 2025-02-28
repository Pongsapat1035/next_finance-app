"use client"

import ModalBox from "../../../components/ModalBox"
import { useEffect, useState } from "react"
import { Stack, TextField, InputAdornment, Select, MenuItem, Button } from "@mui/material"
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { useAuth } from "@/app/finance/authContext";
import { EditCategory } from "@/app/finance/setting/action";
import { useAlert } from "@/app/alertContext";


export default function EditCategoryModal({ modalState, closeModal, value, deleteCategory }) {
    const user = useAuth()
    const { handleAlert } = useAlert()
    const [editData, setEditData] = useState({
        type: '',
        category: '',
        index: ''
    })
    const [checkInputError, setInputError] = useState({
        status: false,
        msg: ''
    })
    const [allListsData, setAllListsData] = useState([])

    useEffect(() => {
        if (value) {
            setEditData((prevState) => ({
                ...prevState,
                type: value.type,
                category: value.name,
                index: value.index
            }))
            setAllListsData(value.data)
        }
    }, [value])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEditData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEditCategory = async () => {
        try {
            const { type, category, index } = editData
            const userId = user.uuid
            const checkDuplicateCategory = allListsData.includes(category)
            if(category === '') {
                setInputError((prevState) => ({
                    ...prevState,
                    status: true,
                    msg: 'Please fill category !'
                }))
                return
            }
            if (checkDuplicateCategory) {
                setInputError((prevState) => ({
                    ...prevState,
                    status: true,
                    msg: 'Duplicate category !'
                }))
                return
            }
            allListsData[index] = category
            const response = await EditCategory(type, allListsData, userId)
            if (response.status === 200) {
                closeModal()
                handleAlert('success', 'update category success')
                window.location.reload()
            }
        } catch (error) {
            alert(error.message)
            console.log('error from edit data : ', error)
        }
    }

    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Edit">
            <Stack spacing={2}>
                <TextField id="outlined-basic" type="type" name="category" value={editData.type} disabled onChange={handleChange}
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
                    error={checkInputError.status}
                    helperText={checkInputError.msg}
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
