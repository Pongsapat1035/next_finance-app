import { Grid2, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from "react";

export default function TransectionChart({ lists }) {
    const [chartData, setChartData] = useState([])
    const [dateLists, setDateLists] = useState([])
    const dataset = [
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        }
    ]
    const getDay = (recievedDate) => {
        const date = new Date(recievedDate * 1000)
        return date.getDate()
    }

    const convertDataToChart = () => {
        lists.forEach(item => item.data.day = getDay(item.data.timeStamp))
        const dateLists = [...new Set(lists.map(item => item.data.day))].sort((a, b) => a - b);

        const data = []

        dateLists.forEach((item) => {
            const filterData = {
                expend: 0,
                income: 0
            }
            const filterLists = lists.filter((el) => el.data.day === item)
            filterLists.forEach((filterItem) => {
                const type = filterItem.data.type
                const amout = filterItem.data.amout
                filterData[type] = (filterData[type] || 0) + amout
            })
            data.push(filterData)
        })
        console.log(data)
        setDateLists(dateLists)
        setChartData(data)
    }

    useEffect(() => {
        convertDataToChart()
    }, [lists])


    return (
        <Grid2 size={8} bgcolor="primary.light" sx={{ borderRadius: '20px', py: 2, px: 4 }}>
            <Typography variant="h5" fontWeight="bold">Summary Chart</Typography>
            <BarChart
                dataset={chartData}
                xAxis={[{ scaleType: 'band', data: dateLists }]}
                series={[
                    { dataKey: 'expend', label: 'Expend' },
                    { dataKey: 'income', label: 'Income' },
                ]}
                height={300}
            />
        </Grid2>
    )
}