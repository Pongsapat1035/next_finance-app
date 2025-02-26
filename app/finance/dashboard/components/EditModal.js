"use client"
import { useState, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { Grid2, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { updateData } from "@/app/finance/dashboard/actions"
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import Stack from "@mui/material/Stack";
import { deleteDocFormId } from "@/app/finance/dashboard/actions";
import { useAlert } from "@/app/alertContext";

import ModalBox from "@/app/components/ModalBox";
import { DateRangeIcon } from "@mui/x-date-pickers";

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDelete = async (uid, docId, month) => {
        try {
            const resposne = await deleteDocFormId(uid, docId, month)
            if (resposne.status === 200) {
                handleAlert('success', 'Transection is deleted')
                closeModal()
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        } catch (error) {
            handleAlert('error', `Can't delete transection`)
            console.log('error from delete transection : ', error)
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            docid: docId,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category'),
            createdDate: data.get('date')
        }
        if (listData.category === 'select category') {
            setErrorCategory(true)
            return
        }
        console.log('data from user : ', listData)
        const response = await updateData(listData)
        console.log(response)
        window.location.reload()
    }


    useEffect(() => {
        const cloneData = JSON.parse(JSON.stringify(recieveData));
        const createdDate = cloneData.data.timeStamp
        setDocId(cloneData.id)
        setDate(dayjs(createdDate * 1000))
        const getMonth = new Date(createdDate * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        // const getMonth = DateRangeIcon
        const docData = cloneData.data
        setFormData(prevState => ({
            ...prevState,
            type: docData.type,
            category: docData.category,
            amout: docData.amout,
            month: getMonth
        }))
    }, [recieveData])

    return (
        <ModalBox state={state} closeModal={closeModal} header="Edit">
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
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
                            <MenuItem value="select type" disabled>select type</MenuItem>
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
                        onClick={() => handleDelete(uid, docId, formData.month)}
                        sx={{ borderRadius: '8px', bgcolor: 'error.main' }}>
                        Delete
                    </Button>
                </Grid2>
            </form>

        </ModalBox>
    )
}

export default EditModal