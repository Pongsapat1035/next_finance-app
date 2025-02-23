"use client"

import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { addData } from "@/app/finance/dashboard/actions"
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import { useAlert } from "@/app/alertContext";

const AddModal = ({ state = false, setState, configData, uid }) => {
    const { handleAlert } = useAlert()
    const [selectedValue, setSelectedValue] = useState('select category')
    const [type, setType] = useState('expend')
    const [date, setDate] = useState(dayjs())
    const [errorCategory, setErrorCategory] = useState(false)
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
        try {
            if (listData.category === 'select category') {
                setErrorCategory(true)
                return
            }
            const response = await addData(listData)
            console.log(response)
            handleAlert('success', 'add new transection success')
            setState()
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            handleAlert('error', "can't add new transection")
            console.log('add transection error : ', error)
            return
        }

    }
    useEffect(() => {
        setSelectedValue('select category')
    }, [type])
    return (
        <Modal
            open={state}
            onClose={() => setState()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Paper sx={{ px: 8, py: 6, borderRadius: '20px', bgcolor: "#FFFEFE", minWidth: '500px', width: 1 / 4, position: 'relative' }}>
                <Grid2 container spacing={2} direction={"column"}>
                    <Typography variant="h4" marginBottom="1rem" fontWeight="bold">
                        New transection
                    </Typography>
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
                                        }}
                                        type="number" variant="outlined" placeholder="Amout" required />
                                </Grid2>
                                <Grid2 size={6}>
                                    <Select name="type" value={type} onChange={handleTypeChange} fullWidth>
                                        <MenuItem value="select type" disabled>select type</MenuItem>
                                        <MenuItem value="expend">Expend</MenuItem>
                                        <MenuItem value="income">Income</MenuItem>
                                    </Select>
                                </Grid2>
                            </Grid2>
                            <Stack alignItems="flex-end">
                                <Select
                                    name="category"
                                    value={selectedValue}
                                    onChange={handleCateChange}
                                    fullWidth
                                >
                                    <MenuItem value="select category" disabled>Select category</MenuItem>
                                    {
                                        configData[type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                                    }
                                </Select>
                                {errorCategory ? <Typography variant="body1" color="error.main">Please select category</Typography> : ''}
                            </Stack>
                            <Button type="submit" variant="contained" sx={{ borderRadius: '8px', mt: '1rem' }}>Create transection</Button>
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