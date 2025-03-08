"use client"

import { Grid2, Typography } from "@mui/material"
import TotalBadgeWarpper from "./components/TotalBadgeWarpper";
import IncomeWarpper from "./components/IncomeWarpper";
import ExpendWarpper from "./components/ExpendWarpper";
import FinanceOverview from "./components/FinanceWarpper";
import TransectionChart from "./components/TransectionChart";
import ProfileBadge from "./components/ProfileBadge";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from "react";

const ReportPage = () => {
    const [date, setDate] = useState(dayjs())
    const handleChangeMonth = (data) => {
        setDate(data)
        // const date = new Date(data)
        // const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        // handleMonth(getMonth)
    }
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
            <TransectionChart></TransectionChart>
            <TotalBadgeWarpper></TotalBadgeWarpper>
            <IncomeWarpper></IncomeWarpper>
            <ExpendWarpper></ExpendWarpper>
          
            <FinanceOverview></FinanceOverview>

        </Grid2>
    )
}

export default ReportPage