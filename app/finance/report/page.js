"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TotalBadgeWarpper from "../../components/ReportPage/TotalBadgeWarpper";
import IncomeWarpper from "../../components/ReportPage/IncomeWarpper";
import ExpendWarpper from "../../components/ReportPage/ExpendWarpper";
import YearlyOverview from "../../components/ReportPage/YearlyOverview";
import TransectionChart from "../../components/ReportPage/TransectionChart";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useEffect, useState } from "react";
import { useAuth } from '@/app/finance/authContext';
import { getAllData } from "@/app/finance/dashboard/actions";
import { getMonthText } from "@/app/util/ConvertData";

const ReportPage = () => {
    const { user } = useAuth()
    const [date, setDate] = useState(dayjs())
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleChangeMonth = (newDate) => {
        setDate(newDate)
        const getMonth = getMonthText(newDate)
        fetchData(user.uuid, getMonth)
    }

    const fetchData = async (uid, month) => {
        try {
            setIsLoading(true)
            const response = await getAllData(uid, month)
            const convertResponse = JSON.parse(response)
            setLists(convertResponse)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            const userId = user.uuid
            const currentMonth = getMonthText()
            fetchData(userId, currentMonth)
        }
    }, [user])

    return (
        <Grid2 container spacing={3} py={4} px={{ xs: 1, sm: 4 }}   >
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
            <TransectionChart  isLoading={isLoading} lists={lists}></TransectionChart>
            <TotalBadgeWarpper lists={lists}></TotalBadgeWarpper>
            <IncomeWarpper isLoading={isLoading} lists={lists}></IncomeWarpper>
            <ExpendWarpper isLoading={isLoading} lists={lists}></ExpendWarpper>
            <Grid2 container size={12} justifyContent="space-between" mb={2}>
                <YearlyOverview></YearlyOverview>
            </Grid2>
        </Grid2>
    )
}

export default ReportPage