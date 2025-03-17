"use client"
import { useState, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import { updateData } from "@/app/finance/dashboard/actions"
import { deleteDocFormId } from "@/app/finance/dashboard/actions";
import { useAlert } from "@/app/alertContext";

import ConfirmModal from "@/app/components/ConfirmModal";
import ModalBox from "@/app/components/ModalBox";

const EditModal = ({ state, category, closeModal, recieveData, uid }) => {

    const { handleAlert } = useAlert()
    const [date, setDate] = useState(dayjs())
    const [errorCategory, setErrorCategory] = useState(false)
    const [docId, setDocId] = useState('')
    const [formData, setFormData] = useState({
        type: '',
        category: '',
        amout: '',
        month: '',
    })
    const [prevDate, setPrevDate] = useState('')

    const [confirmModal, setConfirmModal] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'type') {
            setFormData(prevState => ({
                ...prevState,
                category: 'select category'
            }))
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDelete = async (uid, docId) => {
        try {
            const { month, amout, type } = formData
            const resposne = await deleteDocFormId(uid, docId, { month, amout, type })
            if (resposne.status === 200) {
                handleAlert('success', 'Transection is deleted')
                closeModal()
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            handleAlert('error', `Can't delete transection`)
            console.log('error from delete transection : ', error)
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorCategory(false)
        try {
            const data = new FormData(e.target)
            const listData = {
                userid: uid,
                docid: docId,
                type: data.get('type'),
                amout: data.get('amout'),
                category: data.get('category'),
                createdDate: data.get('date'),
                description: data.get('description'),
                prevDate
            }
            // console.log('check recieved data : ', listData)
            if (listData.category === 'select category') {
                setErrorCategory(true)
                return
            }
            const response = await updateData(listData)

            if (response.status === 200) {
                handleAlert('success', response.message)
                closeModal()
                setTimeout(() => window.location.reload(), 1000);
            } else {
                handleAlert('error', response.message)
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // prevent mutation 
        const cloneData = JSON.parse(JSON.stringify(recieveData));
        const createdDate = cloneData.data.timeStamp
        setDocId(cloneData.id)
        setDate(dayjs(createdDate * 1000))
        setPrevDate(createdDate)
        const getMonth = new Date(createdDate * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        const docData = cloneData.data
        const checkExitCategory = category['expend'].includes(docData.category) || category['income'].includes(docData.category)

        setFormData(prevState => ({
            ...prevState,
            type: docData.type,
            category: checkExitCategory ? docData.category : 'select category',
            amout: docData.amout,
            month: getMonth,
            description: docData.description
        }))
    }, [recieveData])

    return (
        <ModalBox state={state} closeModal={closeModal} header="Edit">
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="description" value={formData.description} onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionRoundedIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        type="text" variant="outlined" placeholder="Description" required />
                    <Grid2 container direction="row" gap={2}>
                        <Grid2 size={6}>
                            <TextField id="outlined-basic" name="amout"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MonetizationOnRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} type="number" label="Amout" onChange={handleChange} value={formData.amout} variant="outlined" />
                        </Grid2>
                        <Grid2 size={6}>
                            <Select name="type" value={formData.type} onChange={handleChange} fullWidth>
                                <MenuItem value="expend" >Expend</MenuItem>
                                <MenuItem value="income" >Income</MenuItem>
                            </Select>
                        </Grid2>
                    </Grid2>
                    <Stack alignItems="flex-end">
                        <Select name="category" value={formData.category} onChange={handleChange} fullWidth>
                            <MenuItem value="select category" disabled>Select category</MenuItem>
                            {
                                category[formData.type] ?
                                    category[formData.type].map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>) : ''
                            }
                        </Select>
                        {errorCategory ? <Typography variant="body1" color="error.main">Please select category</Typography> : ''}
                    </Stack>
                    <Button type="submit" variant="contained" sx={{ borderRadius: '8px' }}>Update</Button>
                    <Button
                        variant="contained"
                        onClick={() => setConfirmModal(true)}
                        sx={{ borderRadius: '8px', bgcolor: 'error.main' }}>
                        Delete
                    </Button>
                </Grid2>
            </form>
            <ConfirmModal
                header="Delete"
                state={confirmModal}
                closeState={() => setConfirmModal(false)}
                action={() => handleDelete(uid, docId)}>
            </ConfirmModal>
        </ModalBox>
    )
}

export default EditModal