'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMonthText } from "@/app/util/ConvertData";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Grid2 from "@mui/material/Grid2";

const TransectionBox = ({ isLoading, lists, handleMonth }) => {
    const [date, setDate] = useState(dayjs())

    const handleChangeMonth = (newDate) => {
        setDate(newDate)
        handleMonth(newDate)
    }

    return (
        <Paper sx={{ p: 4, maxHeight: '695px', height: '695px' }}>
            <Grid2 container direction="column" gap={2} height="100%" flexWrap="nowrap">
                <Grid2 container direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" fontWeight="bold">Transection</Typography>
                    <DatePicker
                        label="Month"
                        maxDate={dayjs()}
                        value={date}
                        openTo="year"
                        views={['year', 'month']}
                        yearsOrder="desc"
                        sx={{ width: 200 }}
                        onChange={handleChangeMonth}
                    />
                </Grid2>
                <Grid2 spacing={1} sx={{ flexGrow: 1, overflow: 'scroll', scrollbarWidth: 'none' }}>
                    {
                        isLoading ? Array.from({ length: 8 }).map((_, index) => (<Skeleton key={index} variant="rounded" width="100%" sx={{ my: 3 }} height={60}></Skeleton>)) :
                            lists.length > 0 ?
                                lists.map((el, index) => (
                                    <TransectionList key={index} data={el}></TransectionList>
                                ))
                                :
                                <Stack justifyContent="center" alignItems="center" textAlign="center" sx={{ fontWeight: 'bold', fontSize: '1rem', py: 3 }}>
                                    😊 "Your transaction history is empty. Let's track your finances!"
                                </Stack>
                    }
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default TransectionBox

const TransectionList = ({ data }) => {
    const router = useRouter()
    const month = getMonthText(data.createdDate)

    const boxStyle = {
        borderBottom: '1px solid',
        borderColor: 'primary.light',
        px: 2,
        py: 1,
        cursor: 'pointer',
        transition: '.5s',
        ':hover': {
            bgcolor: 'primary.light'
        }
    }

    const dayColors = {
        Mon: '#F6DC43',
        Tue: '#EC7FA9',
        Wed: '#16C47F',
        Thu: '#FFA725',
        Fri: '#4D55CC',
        Sat: '#AA60C8',
        Sun: '#FE4F2D'
    }

    return (
        <Grid2 container direction="row" alignItems="center" justifyContent="space-between"
            px={2}
            py={1}
            sx={boxStyle} onClick={() => router.push(`/finance/dashboard/${data.id}?month=${month}`)}>
            <Grid2 container size={2} direction="row" justifyContent="flex-start" px={2} py={{ xs: 0, sm: 1 }} gap={1}>
                <Typography variant="h5" sx={{ fontSize: { xs: 28, sm: 32 } }}>{data.date}</Typography>
                <Typography variant="body1" fontWeight="bold" color={dayColors[data.weekDay]}>{data.weekDay}</Typography>
            </Grid2>
            <Grid2 container size="grow" direction="column" justifyContent="center" px={{ xs: 1, sm: 4 }}>
                <Typography variant="h6" fontWeight="bold">{data.description}</Typography>
                <Typography variant="body1" color="text.light">{data.category}</Typography>
            </Grid2>
            <Grid2 container justifyContent="flex-end" size={2}>
                <Typography variant="h6" fontWeight="semibold" textAlign="end"
                    color={data.type === 'income' ? 'success.main' : 'error.main'}
                >
                    {data.type === 'income' ? data.amout.toLocaleString() : '-' + data.amout.toLocaleString()} THB
                </Typography>
            </Grid2>
        </Grid2>
    )
}