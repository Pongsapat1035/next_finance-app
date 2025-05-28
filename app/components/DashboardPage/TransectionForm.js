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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/finance/authContext";

export default function TransectionFrom({ data = null }) {
    const router = useRouter()
    const { userConfig } = useAuth()
    const [formMode, setFormMode] = useState('create')
    const [date, setDate] = useState(dayjs())
    const [formData, setFormData] = useState({
        description: "",
        amout: 0,
        type: "expend",
        category: 'select category'
    })
    const [inputError, setInputError] = useState({
        category: ''
    })
  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type') {
            setFormData(prev => ({
                ...prev,
                category: 'select category'
            }));
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('check date : ', date)
        console.log(formData)
        if (formData.category === 'select category') {
            setInputError((prev) => ({ ...prev, category: "please select category" }))
            return
        }
    }
    useEffect(() => {
        if (data) {
            setFormMode('edit')
            setFormData({
                description: data.description || "",
                amout: data.amout || 0,
                type: data.type || "expend",
                category: data.category || 'select category'
            });
            if (data.createdDate) {
                setDate(dayjs(data.createdDate));
            }
        }
    }, [data])

    // console.log('check form data : ', formData)
    return (
        <Stack direction="column" gap={2} bgcolor="background.paper" borderRadius={5} sx={{ width: "60%" }}>
            <Grid2 container alignItems="center" paddingBottom={2} p={2} borderBottom={1} borderColor="primary.light">
                <Grid2 size={1}>
                    <IconButton aria-label="delete" onClick={() => router.push("/finance/dashboard")}>
                        <KeyboardArrowLeftRoundedIcon></KeyboardArrowLeftRoundedIcon>
                    </IconButton>
                </Grid2>
                <Grid2 size={11}>
                    <Typography variant="h5">
                        {formMode === 'create' ? 'Create' : 'Edit'} transection
                    </Typography>
                </Grid2>
            </Grid2>
            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2} px={8} py={6} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="description" value={formData.description} onChange={handleInputChange}
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
                            <TextField id="outlined-basic" name="amout" value={formData.amout} onChange={handleInputChange}
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
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="type" value={formData.type} onChange={handleInputChange}>
                                    <FormControlLabel value="expend" control={<Radio />} label="Expend" />
                                    <FormControlLabel value="income" control={<Radio />} label="Income" />
                                </RadioGroup>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                    <Stack alignItems="flex-end">
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value="select category" disabled>Select category</MenuItem>
                            {
                                userConfig[formData.type] ?
                                    userConfig[formData.type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>) : ''
                            }
                        </Select>

                        {inputError.category !== '' ? <Typography variant="body1" color="error.main">{inputError.category}</Typography> : ''}
                    </Stack>
                    <Button type="submit" variant="contained" sx={{ borderRadius: '8px', mt: '1rem' }}>Create transection</Button>
                </Grid2>
            </form>
        </Stack>
    )
}