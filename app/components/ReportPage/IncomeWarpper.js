import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";
import { chartColors } from "@/app/util/FormatChart";
import IncomeSkeleton from "./skeleton/IncomeSkeleton";

export default function IncomeWarpper({ lists }) {

    const [guageLists, setGuageLists] = useState([])
    const [incomeValue, setIncomeValue] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    
    const convertGuageData = (totalAmout, recievedData) => {
        const convertResult = Object.entries(recievedData).map((item, index) => {
            const category = item[0]
            const amout = item[1]
            const percent = (amout / totalAmout * 100).toFixed(2)
            const color = chartColors[index]

            return { category, amout, percent, color }
        }).sort((a, b) => b.percent - a.percent)
        return convertResult
    }

    const changeDataFormat = (data, maxItemOnChart = 4) => {
        const incomeLists = data.filter((item) => item.type === 'income')
        const result = {}
        incomeLists.forEach(item => {
            result[item.category] = (result[item.category] || 0) + item.amout
        })

        const totalIncome = incomeLists.reduce((acc, currentVal) => acc + currentVal.amout, 0)
        const convertedResult = convertGuageData(totalIncome, result)
        const highestLists = convertedResult.slice(0, maxItemOnChart)

        setGuageLists(highestLists)
        setIncomeValue(totalIncome)
    }

    useEffect(() => {
        setIsLoading(true)
        if (lists.length > 0) {
            changeDataFormat(lists)
        } else {
            setGuageLists([])
            setIncomeValue(0)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [lists])

    return (
        <Grid2 container direction="column" gap={2} size={{ xs: 12, md: 6 }} sx={{ bgcolor: 'background.paper', borderRadius: '15px', p: 4 }}>
            <Typography variant="h5" fontWeight="bold" >Income Overview</Typography>

            {
                isLoading ? <IncomeSkeleton></IncomeSkeleton> :
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h4" color="text.primary" fontWeight="light">{incomeValue.toLocaleString()} THB</Typography>
                        <Stack direction="row" height="10px" borderRadius={20} overflow="hidden" gap="2px">
                            {
                                guageLists.map((item, index) => <Box key={index} sx={{ width: `${item.percent}%`, bgcolor: item.color, height: '10px' }}></Box>)
                            }
                        </Stack>
                        <Grid2 container direction="row">
                            {
                                guageLists.map((item, index) => <IncomeCategory key={index} data={item}></IncomeCategory>)
                            }
                        </Grid2>
                    </Stack>
            }

        </Grid2>
    )

}

function IncomeCategory({ data }) {
    return (
        <Grid2 container size={6} direction="column" p={1}>
            <Grid2 container size={12} direction="row" alignItems="center" gap={1}>
                <Box sx={{ width: "10px", height: "10px", borderRadius: "100%", bgcolor: data.color }}></Box>
                <Typography variant="body1" fontWeight="bold">{data.category}</Typography>

            </Grid2>
            <Stack pl='15px' direction="row" gap={1}>
                <Typography variant="body2" color="text.light" fontWeight="light" fontSize="0.9rem">{data.percent}%</Typography>
                <Typography variant="body2" color="text.light" fontWeight="light" fontSize="0.9rem">/ {data.amout.toLocaleString()}</Typography>
            </Stack>
        </Grid2>
    )
}