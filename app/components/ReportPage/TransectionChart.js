import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";
import SummaryChartSkeleton from "./skeleton/SummaryChartSkeleton";

export default function TransectionChart({ isLoading, lists }) {
    const [chartData, setChartData] = useState([])
    const [dateLists, setDateLists] = useState([])

    const convertDataToChart = (recievedList) => {
        const newLists = JSON.parse(JSON.stringify(recievedList))
        const dateLists = [...new Set(newLists.map(item => item.date))].sort((a, b) => a - b);
        const data = []

        dateLists.forEach((item) => {
            const filterData = {
                expend: 0,
                income: 0
            }
            const filterLists = newLists.filter((el) => el.date === item)
            filterLists.forEach((filterItem) => {
                const type = filterItem.type
                const amout = filterItem.amout
                filterData[type] = (filterData[type] || 0) + amout
            })
            data.push(filterData)
        })
        setDateLists(dateLists)
        setChartData(data)
    }

    useEffect(() => {
        convertDataToChart(lists)
    }, [lists])


    return (
        <Grid2 size={{ xs: 12, md: 8 }} bgcolor="background.paper" sx={{ borderRadius: '20px', py: 2, px: 4 }}>
            <Typography variant="h5" fontWeight="bold">Summary Chart</Typography>
            {
                isLoading ? <SummaryChartSkeleton></SummaryChartSkeleton> :
                    <BarChart
                        dataset={chartData}
                        xAxis={[{ scaleType: 'band', data: dateLists }]}
                        series={[
                            { dataKey: 'expend', label: 'Expend', color: chartColors[1] },
                            { dataKey: 'income', label: 'Income', color: chartColors[3] },
                        ]}
                      
                        height={300}
                    />
            }
        </Grid2>
    )
}