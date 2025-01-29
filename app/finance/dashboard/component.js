"use client"
import { useState } from "react"
import {
    Grid2,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
    Box,
    Typography
} from "@mui/material"

import { addData } from "./actions"

export const InputBox = ({ configData, uid, month }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const [type, setType] = useState('expend')

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    const handleChangeType = (event) => {
        setType(event.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category')
        }
        console.log('data from user : ', listData)
        const response = await addData(listData, month)
        console.log(response)
        window.location.reload()
    }
    return (
        <Grid2 container spacing={2} direction={"column"}>
            <form onSubmit={submitForm}>
                <TextField id="outlined-basic" name="amout" type="number" label={type} variant="outlined" />
                <Select
                    name="type"
                    value={type}
                    onChange={handleChangeType}
                >
                    <MenuItem value="select type" disabled>select type</MenuItem>
                    <MenuItem value="expend">expend</MenuItem>
                    <MenuItem value="income">income</MenuItem>
                </Select>
                <Select
                    name="category"
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <MenuItem value="select type" disabled>select type</MenuItem>
                    {
                        configData[type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                    }

                </Select>
                <Button type="submit" variant="contained">Add</Button>
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

export const EditContainer = ({ data, category }) => {
    const docId = data.id
    const docData = data.data
    const [type, setType] = useState('expend')
  
    const handleChangeType = () => {

    }
    const changeType = (e) => {
        setType(e.target.value)
    }
    return (
        <div>
            <Typography variant="h2">Edit</Typography>
            <TextField id="outlined-basic" name="amout" type="number" label="Amout" variant="outlined" />
            <Select name="type" value={type} onChange={changeType}>
                <MenuItem value="expend" >expend</MenuItem>
                <MenuItem value="income" >income</MenuItem>
            </Select>
            <Select name="category" value="selectType">
                <MenuItem value="selectType" disabled>select type</MenuItem>
                {
                    category[type].map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)
                }

            </Select>
            <Button type="submit" variant="contained">Add</Button>
        </div>
    )
}