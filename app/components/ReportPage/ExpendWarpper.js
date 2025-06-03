"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from "react";
import { ChangeFormatChartData } from "@/app/util/FormatChart";
import PieChartSkeleton from "./skeleton/PieChartSkeleton";
import { TopCategory } from "../DashboardPage/ChartWraper";

export default function ExpendWarpper({ isLoading, lists }) {
    const [dataLists, setDataLists] = useState([])
    const [legendState, setLagendState] = useState(false)
    useEffect(() => {
        if (lists.length > 0) {
            const result = ChangeFormatChartData(lists)
            setDataLists(result)
        } else {
            setDataLists([])
        }
    }, [lists])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setLagendState(true);
            } else {
                setLagendState(false)
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Grid2 container direction="column" size={{ xs: 12, md: 6 }} p={4} bgcolor="background.paper" borderRadius='15px' gap={1} sx={{ overflow: 'hidden' }}>
            <Typography variant="h5" fontWeight="bold">Expend Overview</Typography>
            {
                isLoading ? <PieChartSkeleton></PieChartSkeleton> :
                    <PieChart
                        series={[
                            {
                                data: dataLists,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                innerRadius: 45,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                cx: 120,
                                valueFormatter: (v, { dataIndex }) => {
                                    return `${dataLists[dataIndex].name} : ${dataLists[dataIndex].value} THB`;
                                },
                            },
                        ]}
                        slotProps={{
                            legend: { hidden: legendState },
                        }}
                        width={400}
                        height={200}
                    />
            }
            <Grid2 container spacing={1} direction="column" sx={{ display: { xs: 'flex', sm: 'none' }}}>
                {
                    dataLists.map((item, index) => <TopCategory key={index} name={item.name} color={item.color}></TopCategory>)
                }
            </Grid2>
        </Grid2>
    )

}