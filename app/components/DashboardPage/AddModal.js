"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';

import ModalBox from "@/app/components/ModalBox";

import { useEffect, useState } from "react";
import { createTransection } from "@/app/finance/dashboard/actions"
import { useAlert } from "@/app/alertContext";


const AddModal = ({ state = false, closeModal, category, uid }) => {
    const { handleAlert } = useAlert()
    const [selectedValue, setSelectedValue] = useState('select category')
    const [type, setType] = useState('select type')
    const [date, setDate] = useState(dayjs())
    const [errorCategory, setErrorCategory] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)

        const listData = {
            userid: uid,
            description: data.get('description'),
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
            const response = await createTransection(listData)

            if (response.status === 201) {
                // create transection success
                handleAlert('success', 'add new transection success')
                closeModal()

                // call fetch data
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }

        } catch (error) {
            handleAlert('error', "can't add new transection")
            console.log('add transection error : ', error)
            return
        }

    }
    useEffect(() => {
        // reset calegory every time type selector is change
        setSelectedValue('select category')
    }, [type])

    useEffect(() => {
        setType('select type')
        setSelectedValue('select category')
    }, [state])

    return (
        <ModalBox state={state} closeModal={closeModal} header="New transection">
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="description"
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
                                }}
                                type="number" variant="outlined" placeholder="Amout" required />
                        </Grid2>
                        <Grid2 size={6}>
                            <Select name="type" value={type} onChange={(e) => setType(e.target.value)} fullWidth>
                                <MenuItem value="select type" disabled>Select type</MenuItem>
                                <MenuItem value="expend">Expend</MenuItem>
                                <MenuItem value="income">Income</MenuItem>
                            </Select>
                        </Grid2>
                    </Grid2>
                    <Stack alignItems="flex-end">
                        <Select
                            name="category"
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="select category" disabled>Select category</MenuItem>
                            {
                                category[type] ?
                                    category[type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>) : ''
                            }
                        </Select>
                        {errorCategory ? <Typography variant="body1" color="error.main">Please select category</Typography> : ''}
                    </Stack>
                    <Button type="submit" variant="contained" sx={{ borderRadius: '8px', mt: '1rem' }}>Create transection</Button>
                </Grid2>
            </form>
        </ModalBox>
    )
}

export default AddModal                                                                  