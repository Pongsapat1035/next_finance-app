import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";

export default function TransectionChart({ lists }) {
    const [chartData, setChartData] = useState([])
    const [dateLists, setDateLists] = useState([])
   
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
        <Grid2 size={8} bgcolor="background.paper" sx={{ borderRadius: '20px', py: 2, px: 4 }}>
            <Typography variant="h5" fontWeight="bold">Summary Chart</Typography>
            <BarChart
                dataset={chartData}
                xAxis={[{ scaleType: 'band', data: dateLists }]}
                series={[
                    { dataKey: 'expend', label: 'Expend', color: chartColors[1]  },
                    { dataKey: 'income', label: 'Income', color: chartColors[3] },
                ]}
                height={300}
            />
        </Grid2>
    )
}