"use client"
import { useState, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { Modal, Paper, Grid2, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import { updateData } from "@/app/finance/dashboard/actions"
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import Stack from "@mui/material/Stack";
import { deleteDocFormId } from "@/app/finance/dashboard/actions";
import { useAlert } from "@/app/alertContext";
import CloseIcon from '@mui/icons-material/Close';

const EditModal = ({ state, category, toggleState, recieveData, uid, setState }) => {
    const cloneData = JSON.parse(JSON.stringify(recieveData));
    const createdDate = cloneData.data.timeStamp
    const { handleAlert } = useAlert()
    const [date, setDate] = useState(dayjs())
    const [errorCategory, setErrorCategory] = useState(false)

    const docId = cloneData.id
    const docData = cloneData.data
    // const [type, setType] = useState('expend')
    const [formData, setFormData] = useState({
        type: '',
        category: '',
        amout: '',
        month: '',
    })
    // console.log('check form data : ', formData)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleDelete = async (uid, docId, month) => {
        const resposne = await deleteDocFormId(uid, docId, month)

        if (resposne === 'success') {
            handleAlert('success', 'Transection is deleted')
        } else {
            handleAlert('error', `Can't delete transection`)
        }
        toggleState()
        setTimeout(() => {
            window.location.reload()
        }, 1000);

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
        // setType(docData.type)
        setDate(dayjs(createdDate * 1000))
        const date = new Date(createdDate * 1000)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        setFormData(prevState => ({
            ...prevState,
            type: docData.type,
            category: docData.category,
            amout: docData.amout,
            month: getMonth
        }))
    }, [recieveData])

    const paperStyle = { px: 8, py: 6, borderRadius: '20px', bgcolor: "#FFFEFE", minWidth: '500px', width: 1 / 4, position: 'relative' };
    return (
        <Modal
            open={state}
            onClose={() => toggleState()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Paper sx={paperStyle}>
                <form onSubmit={submitForm}>
                    <Grid2 container spacing={2} direction={"column"}>
                        <Typography variant="h2">Edit</Typography>
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
                <IconButton aria-label="delete" onClick={toggleState} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </Modal>
    )
}

export default EditModal