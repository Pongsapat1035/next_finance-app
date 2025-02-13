"use client"

import { useState } from "react";
import {
    Grid2,
    Paper,
    Typography,
    Modal,
    Select,
    MenuItem,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { addData } from "@/app/finance/dashboard/actions"

const AddModal = ({ state = false, setState, configData, uid }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const [type, setType] = useState('expend')
    const [date, setDate] = useState(dayjs())

    const handleCateChange = (event) => setSelectedValue(event.target.value)
    const handleTypeChange = (event) => setType(event.target.value)

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

    return (
        <Modal
            open={state}
            onClose={() => setState()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Paper sx={{ p: 8, borderRadius: '20px', bgcolor: "#FFFEFE", width: 1 / 4, position: 'relative' }}>
                <Grid2 container spacing={2} direction={"column"}>
                    <Typography variant="h4" marginBottom="1rem">
                        New transection
                    </Typography>
                    <form onSubmit={submitForm}>
                        <Grid2 container spacing={2} direction={"column"}>
                            <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                            <TextField id="outlined-basic" name="amout" type="number" label="Amout" variant="outlined" required />
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
                <IconButton aria-label="delete" onClick={setState} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </Modal>
    )
}

export default AddModal                                                                  