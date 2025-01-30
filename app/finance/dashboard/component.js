"use client"
import { useEffect, useState } from "react"
import {
    Grid2,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
    Box,
    Typography,
    Alert
} from "@mui/material"

import { CheckIcon, ClearIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { addData, updateData } from "./actions"

export const InputBox = ({ configData, uid }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const [type, setType] = useState('expend')
    const [date, setDate] = useState(dayjs())

    const handleCateChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category'),
            createdDate: data.get('date')
        }
        console.log('data from user : ', listData)
        const response = await addData(listData)
        console.log(response)
        window.location.reload()
    }
    useEffect(() => {
        // console.log(date.format())
    }, [date])
    // console.log(type)
    return (
        <Grid2 container spacing={2} direction={"column"}>
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="amout" type="number" label={type} variant="outlined" required />
                    <Select
                        name="type"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="select type" disabled>select type</MenuItem>
                        <MenuItem value="expend">expend</MenuItem>
                        <MenuItem value="income">income</MenuItem>
                    </Select>
                    <Select
                        name="category"
                        value={selectedValue}
                        onChange={handleCateChange}
                    >
                        <MenuItem value="select type" disabled>select type</MenuItem>
                        {
                            configData[type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                        }
                    </Select>
                    <Button type="submit" variant="contained">Add</Button>
                </Grid2>
            </form>
        </Grid2>
    )
}

export const DashboardContainer = ({ data }) => {
    return (
        <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            <Grid2 container spacing={2}>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h4">Income</Typography>
                    <Typography variant="h2">${data.income}</Typography>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h4">Expend</Typography>
                    <Typography variant="h2">${data.expend}</Typography>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h4">Summary</Typography>
                    <Typography variant="h2">${data.change}</Typography>
                </Box>
            </Grid2>
        </Paper>
    )
}

export const EditContainer = ({ recieveData, category, uid, deleteFunction }) => {
    // console.log(data)
    const data = JSON.parse(JSON.stringify(recieveData));
    const createdDate = data.data.timeStamp
    // console.log(createdDate)
    const [date, setDate] = useState(dayjs(createdDate * 1000))

    const docId = data.id
    const docData = data.data
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



    return (
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
    )
}

export function AlertBox({ type, msg }) {
    
    return (
        <Alert  severity={type}>
            Here is a gentle confirmation that your action was successful.
            {type}
            {msg}
        </Alert>
    )
}