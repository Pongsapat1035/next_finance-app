"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TotalBadgeWarpper from "./components/TotalBadgeWarpper";
import IncomeWarpper from "./components/IncomeWarpper";
import ExpendWarpper from "./components/ExpendWarpper";
import FinanceOverview from "./components/MonthlyWarpper";
import TransectionChart from "./components/TransectionChart";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useEffect, useState } from "react";
import { useAuth } from '../authContext';
import { getAllData, getTotalReport } from "@/app/finance/dashboard/actions";


const ReportPage = () => {
    const user = useAuth()
    const [date, setDate] = useState(dayjs())
    const [lists, setLists] = useState([])
    const [totalLists, setTotalLsits] = useState([])

    const handleChangeMonth = (data) => {
        setDate(data)
        const date = new Date(data)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        fetchData(user.uuid, getMonth)
    }

    const fetchData = async (uid, month) => {
        try {
            const response = await getAllData(uid, month)
            const convertResponse = JSON.parse(response)

            convertResponse.forEach(element => {
                element.data.amout = parseInt(element.data.amout)
                element.data.timeStamp = element.data.createdDate.seconds
            });
            // console.log('check lists : ', convertResponse)
            setLists(convertResponse)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchTotalMonth = async (uid) => {
        try {
            const response = await getTotalReport(uid)
            // console.log(response)
            setTotalLsits(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // fetch data from first load
        if (user) {
            const date = new Date()
            const month = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
            fetchData(user.uuid, month)
            fetchTotalMonth(user.uuid)
        }
    }, [user])

    return (
        <Grid2 container spacing={3} p={4} >
            <Grid2 container size={12} justifyContent="space-between" mb={2}>
                <Typography variant="h4" fontWeight="bold">Financial summary</Typography>
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
            <TransectionChart lists={lists}></TransectionChart>
            <TotalBadgeWarpper lists={lists}></TotalBadgeWarpper>
            <IncomeWarpper lists={lists}></IncomeWarpper>
            <ExpendWarpper lists={lists}></ExpendWarpper>
            <Grid2 container size={12} justifyContent="space-between" mb={2}>
                <FinanceOverview lists={totalLists}></FinanceOverview>
            </Grid2>
        </Grid2>
    )
}

export default ReportPage