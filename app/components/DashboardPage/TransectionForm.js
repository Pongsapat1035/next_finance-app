"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

import { useAuth } from "@/app/finance/authContext";
import { createTransection, deleteDocFormId, updateData } from "@/app/finance/dashboard/actions";
import { validateTransectionForm } from "@/app/util/Validation";
import { useConfirm } from "@/app/confirmContext";

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
import IconButton from "@mui/material/IconButton";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import FormSkeleton from "./skeleton/FormSkeleton";
import { getMonthText } from "@/app/util/ConvertData";
import { useAlert } from "@/app/alertContext";

export default function TransectionFrom({ data = null, mode }) {
    const router = useRouter()
    const { user, userConfig } = useAuth()
    const { handleAlert } = useAlert()
    const { handleConfirm } = useConfirm()
    const [date, setDate] = useState(dayjs())
    const [formData, setFormData] = useState({
        description: "",
        amout: 0,
        type: "expend",
        category: 'select category'
    })
    const [inputError, setInputError] = useState({
        amout: '',
        description: '',
        category: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setButtonLoading(true)
            const updateFormData = new FormData(e.target)
            const result = validateTransectionForm(formData)
            const allEmptyError = Object.values(result).every(val => val === '');
            if (!allEmptyError) {
                setInputError({ ...result })
                throw new Error("Validate input fail")
            }
            const newData = {
                ...formData,
                createdDate: updateFormData.get("date"),
                userId: user.uuid
            }

            if (mode === 'create') {
                const { status, message } = await createTransection(newData)
                if (status !== 200) throw new Error(message)

                handleAlert('success', message)
                router.push("/finance/dashboard")

            } else {
                const updateFormData = {
                    ...newData,
                    prevMonth: new Date(data.createdDate),
                    docId: data.id,
                }
                const { status, message } = await updateData(updateFormData)
                if (status !== 200) throw new Error(message)

                handleAlert('success', message)
                router.push("/finance/dashboard")
            }
        } catch (error) {
            console.log(error)
            handleAlert('error', error.message)
        } finally {
            setButtonLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            const deleteData = {
                month: getMonthText(data.createdDate),
                type: data.type,
                amout: data.amout
            }
            handleConfirm("Delete", "Are you sure to delete", async () => await deleteDocFormId(user.uuid, data.id, deleteData))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (data) {
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

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }, [])

    const containerStyle = {
        width: { xs: "100vw", sm: "60%" },
        height: { xs: "100vh", sm: "min-content" },
        borderRadius: { xs: 0, sm: 6 },
        position: { xs: "fixed", sm: 'static' },
        top: { xs: 0 },
        left: { xs: 0 },

    }

    return (
        <Stack direction="column" gap={2} bgcolor="background.paper"
            sx={containerStyle}>
            <Grid2 container alignItems="center" spacing={2} paddingBottom={2} p={2} borderBottom={1} borderColor="primary.light">
                <Grid2 size={{ xs: 2, sm: 1 }}>
                    <IconButton aria-label="delete" onClick={() => router.push("/finance/dashboard")}>
                        <KeyboardArrowLeftRoundedIcon></KeyboardArrowLeftRoundedIcon>
                    </IconButton>
                </Grid2>
                <Grid2 size="auto">
                    <Typography variant="h5">
                        {mode === 'create' ? 'Create' : 'Edit'} transection
                    </Typography>
                </Grid2>
            </Grid2>
            {
                isLoading ? <FormSkeleton></FormSkeleton> :
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2} direction={"column"} px={{ xs: 4, sm: 8 }} py={{ xs: 3, sm: 6 }} >
                            <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                            <TextField id="outlined-basic" name="description" value={formData.description} onChange={handleInputChange} error={inputError.description} helperText={inputError.description}
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
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <TextField id="outlined-basic" fullWidth name="amout" value={formData.amout} onChange={handleInputChange} error={inputError.amout} helperText={inputError.amout}
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
                                <Grid2 size={{ xs: 12, sm: 6 }}>
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
                                {inputError.category !== '' ? <Typography variant="body1" color="error.main" fontSize={12}>{inputError.category}</Typography> : ''}
                            </Stack>
                            <Button type="submit" variant="contained" loading={buttonLoading} sx={{ borderRadius: '8px', mt: '1rem' }}>{mode === 'edit' ? 'Update' : 'Create'} transection</Button>
                            {
                                mode === 'edit' ? <Button type="button" variant="contained" onClick={handleDelete} sx={{ borderRadius: '8px', mt: '1rem', backgroundColor: "error.main" }}>Delete transection</Button> : ''
                            }
                        </Grid2>
                    </form>
            }
        </Stack>
    )
}