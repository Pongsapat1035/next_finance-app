"use client"
import { useState, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { Modal, Box, Grid2, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import {  updateData } from "@/app/finance/dashboard/actions"

const EditModal = ({ state, category, toggleState, recieveData }) => {
    const cloneData = JSON.parse(JSON.stringify(recieveData));
    const createdDate = cloneData.data.timeStamp

    const [date, setDate] = useState(dayjs(createdDate * 1000))

    const docId = cloneData.id
    const docData = cloneData.data
    const [type, setType] = useState('expend')
    const [formData, setFormData] = useState({
        type: docData.type,
        category: docData.category,
        amout: docData.amout,
        month: docData.month,
    })

    const changeType = (e) => {
        setType(e.target.value)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))


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
        console.log('data from user : ', listData)
        const response = await updateData(listData)
        console.log(response)
        window.location.reload()
    }


    useEffect(() => {
        // setType(docData.type)
        setFormData(prevState => ({
            ...prevState,
            type: docData.type,
            category: docData.category,
            amout: docData.amout,
            month: docData.month
        }))
        setDate(dayjs(createdDate * 1000))
    }, [recieveData])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={state}
            onClose={() => toggleState()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <form onSubmit={submitForm}>
                        <Grid2 container spacing={2} direction={"column"}>
                            <Typography variant="h2">Edit</Typography>
                            <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                            <TextField id="outlined-basic" name="amout" type="number" label="Amout" onChange={handleChange} value={formData.amout} variant="outlined" />
                            <Select name="type" value={formData.type} onChange={handleChange}>
                                <MenuItem value="expend" >expend</MenuItem>
                                <MenuItem value="income" >income</MenuItem>
                            </Select>
                            <Select name="category" value={formData.category} onChange={handleChange}>
                                <MenuItem value="select type" disabled>select type</MenuItem>
                                {
                                    category[type].map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)
                                }
                            </Select>
                            <Button type="submit" variant="contained">Update</Button>
                            <Button variant="contained" onClick={() => deleteFunction(uid, docId, formData.month)}>Delete</Button>
                        </Grid2>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}

export default EditModal