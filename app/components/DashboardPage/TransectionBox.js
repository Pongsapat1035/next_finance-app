'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { getMonthText } from "@/app/util/ConvertData";

const TransectionBox = ({ checkLoading, setLoadingSuccess, lists, handleMonth }) => {
    const [date, setDate] = useState(dayjs())
    const [listsData, setListsData] = useState([])
    const skeletoLists = new Array(8).fill('')

    const handleChangeMonth = (newDate) => {
        setDate(newDate)
        handleMonth(newDate)
    }

    const convertTimestamp = () => {
        if (lists.length > 0) {
            lists.forEach(list => {
                const convertToDate = new Date(list.data.timeStamp * 1000)
                const getDay = convertToDate.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' })
                list.data.day = getDay
            });

            const sortLists = lists.sort((a, b) => b.data.timeStamp - a.data.timeStamp)
            setListsData(sortLists)
        } else {
            setListsData([])
        }
        setLoadingSuccess()
    }

    useEffect(() => {
        convertTimestamp()
    }, [lists])

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
                        checkLoading ?
                            skeletoLists.map((_, index) => (
                                <Box key={index} my={2}>
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                </Box>))
                            :
                            listsData.length > 0 ?
                                listsData.map((el, index) => (
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
    const transectionData = data.data
    const unixTime = transectionData.timeStamp
    const month = getMonthText(unixTime * 1000)

    const date = new Date(transectionData.timeStamp * 1000)
    const dayText = date.toLocaleDateString("en-us", { weekday: 'short' })

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
                <Typography variant="h5" sx={{ fontSize: { xs: 28, sm: 32 } }}>{date.getDate()}</Typography>
                <Typography variant="body1" fontWeight="bold" color={dayColors[dayText]}>{dayText}</Typography>
            </Grid2>
            <Grid2 container size="grow" direction="column" justifyContent="center" px={{ xs: 1, sm: 4 }}>
                <Typography variant="h6" fontWeight="bold">{transectionData.description}</Typography>
                <Typography variant="body1" color="text.light">{transectionData.category}</Typography>
            </Grid2>
            <Grid2 container justifyContent="flex-end" size={2}>
                <Typography variant="h6" fontWeight="semibold" textAlign="end"
                    color={transectionData.type === 'income' ? 'success.main' : 'error.main'}
                >
                    {transectionData.type === 'income' ? transectionData.amout : '-' + transectionData.amout} THB
                </Typography>
            </Grid2>
        </Grid2>
    )
}