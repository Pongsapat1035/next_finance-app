"use client"

import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from "react";
import { ChangeFormatChartData } from "@/app/util/FormatChart";
import PieChartSkeleton from "./skeleton/PieChartSkeleton";

export default function ExpendWarpper({ lists }) {
    const [dataLists, setDataLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (lists.length > 0) {
            const result = ChangeFormatChartData(lists)
            setDataLists(result)
        } else {
            setDataLists([])
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }, [lists])

    return (
        <Grid2 container direction="column" size={{ xs: 12, md: 6 }} p={4} bgcolor="background.paper" borderRadius='15px' gap={1}>
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
                        width={400}
                        height={200}
                    />
            }

        </Grid2>
    )

}