'use client'

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import TransectionBadge from "../../../components/TransectionBadge";
import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";

const TransectionBox = ({ checkLoading, setLoadingSuccess, lists, handleMonth, handleEdit }) => {
    const [date, setDate] = useState(dayjs())
    const [listsData, setListsData] = useState([])
    const skeletoLists = new Array(5).fill('')
    const handleChangeMonth = (data) => {
        setDate(data)
        const date = new Date(data)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        handleMonth(getMonth)
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
            setLoadingSuccess()
        }
    }

    useEffect(() => {
        convertTimestamp()
    }, [lists])

    return (
        <Paper sx={{ p: 3, maxHeight: '695px', height: '695px' }}>
            <TableContainer component={Paper} sx={{ height: '100%', overflow: 'auto', maxHeight: '695px' }}>
                <Table sx={{ overflow: 'hidden' }} aria-label="simple table">
                    <TableHead sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper' }}>
                        <TableRow>
                            <TableCell colSpan={4} >
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
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
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Amout</TableCell>
                        </TableRow>

                    </TableHead>
                    {
                        checkLoading ?
                            <TableBody>
                                {skeletoLists.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={4} sx={{ border: 0 }}>
                                            <Skeleton variant="rounded" width="100%" height={60} />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody> :
                            listsData.length > 0 ?
                                <TableBody>
                                    {listsData.map((row, index) => (
                                        <TableRow
                                            hover
                                            key={index}
                                            sx={{ border: 0, cursor: "pointer" }}
                                            onClick={() => handleEdit(row)}
                                        >
                                            <TableCell component="th" scope="row" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                {row.data.day}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                <Stack alignItems="center">
                                                    <TransectionBadge type={row.data.type}></TransectionBadge>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: '0.9rem' }}>{row.data.category}</TableCell>
                                            <TableCell align="right"
                                                sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: row.data.type === 'income' ? 'success.main' : 'error.main' }}>
                                                {row.data.type === 'income' ? '+' : '-'} {row.data.amout} THB
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody> :
                                <TableBody>
                                    <TableRow >
                                        <TableCell colSpan={4} sx={{ border: 0, pt: 8 }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                                😊 "Your transaction history is empty. Let's track your finances!"
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                    }
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TransectionBox