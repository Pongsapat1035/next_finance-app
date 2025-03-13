"use client"
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";

export default function IncomeWarpper({ lists }) {

    const [guageLists, setGuageLists] = useState([])
    const [incomeValue, setIncomeValue] = useState(0)

    const changeDataFormat = (data, maxItemOnChart = 6) => {
        const incomeLists = data.filter((item) => item.data.type === 'income')

        const result = {}
        incomeLists.forEach(item => {
            result[item.data.category] = (result[item.data.category] || 0) + item.data.amout

        })
        // find total income
        const sumIncome = incomeLists.reduce((acc, currentVal) => acc + currentVal.data.amout, 0)


        const convertResult = Object.entries(result).map((item, index) => {
            const percent = (item[1] / sumIncome * 100).toFixed(2)
            const color = chartColors[index]

            return { category: item[0], amout: item[1], percent, color }
        }).sort((a, b) => b.percent - a.percent)

        // select highest 6 items
        const highestLists = convertResult.slice(0, maxItemOnChart)

        setGuageLists(highestLists)
        setIncomeValue(sumIncome)
    }

    useEffect(() => {
        if (lists.length > 0) {
            changeDataFormat(lists)
        } else {
            setGuageLists([])
            setIncomeValue(0)
        }
    }, [lists])

    return (
        <Grid2 container direction="column" gap={2} size={6} sx={{ bgcolor: 'background.paper', borderRadius: '15px', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" >Income Overview</Typography>
            <Typography variant="h4" color="text.primary" fontWeight="light">{incomeValue.toLocaleString()} THB</Typography>
            <Stack direction="row" height="10px" borderRadius={20} overflow="hidden" gap="2px">
                {
                    guageLists.map((item, index) => <Box key={index} sx={{ width: `${item.percent}%`, bgcolor: item.color, height: '10px' }}></Box>)
                }
            </Stack>
            <Grid2 container direction="row">
                {
                    guageLists.map((item, index) => <IncomeCategory key={index} name={item.category} value={item.amout} percent={item.percent} color={item.color}></IncomeCategory>)
                }
            </Grid2>
        </Grid2>
    )

}

function IncomeCategory({ name, value, percent, color }) {
    return (
        <Grid2 container size={6} direction="column" p={1}>
            <Grid2 container size={12} direction="row" alignItems="center" gap={1}>
                <Box sx={{ width: "10px", height: "10px", borderRadius: "100%", bgcolor: color }}></Box>
                <Typography variant="body1" fontWeight="bold">{name}</Typography>

            </Grid2>
            <Stack pl='15px' direction="row" gap={1}>
                <Typography variant="body2" color="text.light" fontWeight="light" fontSize="0.9rem">{percent}%</Typography>
                <Typography variant="body2" color="text.light" fontWeight="light" fontSize="0.9rem">/ {value.toLocaleString()}</Typography>
            </Stack>
        </Grid2>
    )
}