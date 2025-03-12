"use client"
import { Grid2, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from "react";

export default function ExpendWarpper({ lists }) {
    const [dataLists, setDataLists] = useState([])

    const sortLists = (recieveData) => {
        const result = {}

        recieveData.forEach(element => {
            const data = element.data
            if (data.type === 'expend') {
                result[data.category] = (result[data.category] || 0) + data.amout
            }
        });
        console.log(result)
        // convert to array
        let convertResult = Object.entries(result).map((item, index) => {
            return { id: index, value: item[1], name: item[0], label: item[0] }
        });

        // sort by descending
        const sortedResult = convertResult.sort((a, b) => b.value - a.value)

        // set max item show on chart 
        const maxItemOnChart = 4

        const highestLists = sortedResult.slice(0, maxItemOnChart)
        const colorPallete = ['#705772', '#F38181', '#FAD284', '#A9EEC2']
        highestLists.forEach((item, index) => item.color = colorPallete[index])
        setDataLists(highestLists)
    }


    useEffect(() => {
        if (lists.length > 0) {
            sortLists(lists)
        }
    }, [lists])
    return (
        <Grid2 container size={4} p={2} bgcolor="primary.light" borderRadius='15px'>
            <Typography variant="h5" fontWeight="bold">Expend Analysis</Typography>
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
        </Grid2>
    )

}