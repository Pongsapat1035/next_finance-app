"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";

export default function FinanceOverview({ lists }) {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // prevent mutaion
        if (lists.length > 0) {
            const listsData = JSON.parse(JSON.stringify(lists))
            listsData.forEach(el => el.monthIndex++)

            listsData.sort((a, b) => a.monthIndex - b.monthIndex)
            setChartData(listsData)
        }
    }, [lists])

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
            <Typography variant="h5" fontWeight="bold">Monthly overview</Typography>
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