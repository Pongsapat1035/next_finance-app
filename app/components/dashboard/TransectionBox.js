'use client'

import {
    Paper,
    Typography,
    Table,
    TableContainer,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    Button,
    Stack
} from "@mui/material";

import TransectionBadge from "../TransectionBadge";
import { useEffect } from "react";

const TransectionBox = ({ lists, toggleEdit, handleEdit }) => {

    function createData(name, type, fat, carbs) {
        return { name, type, fat, carbs };
    }
    console.log(lists)

    const getDateFormatted = (recieveDate) => {
        const date = recieveDate ? new Date(recieveDate * 1000) : new Date()
        const options = {
            weekday: 'short',
            month: 'short'
        }
        return date.toLocaleDateString("en-US", options)
    }

    useEffect(() => {
        lists.forEach(list => {
            const convertToDate = new Date(list.data.timeStamp * 1000)
            const getDay = convertToDate.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' })
            list.data.day = getDay
        });
    }, [lists])

    return (
        <Paper sx={{ height: '100%', p: 3 }}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">Transection</Typography>
                <Button variant="contained">Jan 25</Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Amout</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lists.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }} onClick={() => handleEdit(row)}
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TransectionBox