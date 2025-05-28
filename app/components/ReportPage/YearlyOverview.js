"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";
import { useAuth } from "@/app/finance/authContext";
import { getTotalReport } from "@/app/finance/dashboard/actions";
import { Stack } from "@mui/material";

export default function YearlyOverview() {
    const { user } = useAuth()
    const [chartData, setChartData] = useState([])
    const thisYear = new Date().getFullYear();
    const initialYearLists = Array.from({ length: 5 }, (_, i) => (thisYear - i).toString());

    const [year, setYear] = useState(initialYearLists[0])

    const fetchTotalLists = async (uid, year) => {
        const response = await getTotalReport(uid, year)

        if (response.length > 0) {
            response.forEach(el => el.monthIndex++)
            response.sort((a, b) => a.monthIndex - b.monthIndex)
            setChartData(response)
        } else {
            setChartData([])
        }
    }

    const handleYearChange = (e) => {
        const newYear = e.target.value
        setYear(newYear)
        fetchTotalLists(user.uuid, newYear)
    }

    useEffect(() => {
        if (user) {
            fetchTotalLists(user.uuid, year)
        }
    }, [user])

    const convertMonthToString = (month) => {
        switch (month) {
            case 1:
                return "Jan"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "May"
            case 6:
                return "Jun"
            case 7:
                return "July"
            case 8:
                return "Aug"
            case 9:
                return "Sep"
            case 10:
                return "Oct"
            case 11:
                return "Nov"
            case 12:
                return "Dec"
            default:
                return ""
        }

    }

    return (
        <Grid2 size={12} container direction="column" bgcolor="background.paper" spacing={1} borderRadius="15px" p={4} >
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">Yearly overview</Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Year"
                        onChange={handleYearChange}
                    >
                        {
                            initialYearLists.map((el, index) => <MenuItem value={el} key={index}>{el}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Stack>
            <LineChart
                xAxis={[{
                    dataKey: "monthIndex", valueFormatter: (value) => convertMonthToString(value),
                }]}
                series={[
                    { dataKey: "expend", color: chartColors[1], label: 'expend' },
                    { dataKey: "income", color: chartColors[3], label: 'Income' }
                ]}
                dataset={chartData}
                height={300}
            />
        </Grid2>
    )

}