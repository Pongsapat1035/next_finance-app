"use client"
import { Grid2, Stack, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
export default function IncomeWarpper({ lists }) {
    const [guageLists, setGuageLists] = useState([])
    useEffect(() => {
        const incomeLists = lists.filter((item) => item.data.type === 'income')
        // console.log('check income lists : ', incomeLists)
        const result = {}
        let total = 0
        incomeLists.forEach(item => {
            result[item.data.category] = (result[item.data.category] || 0) + item.data.amout
            total += item.data.amout
        })
        const colorLists = ['red', 'green', 'blue']
        const convertResult = Object.entries(result).map((item, index) => {
            const percent = Math.floor(item[1] / total * 100)
            return { category: item[0], amout: item[1], percent, color: colorLists[index] }
        }).sort((a, b) => b.percent - a.percent)
        setGuageLists(convertResult)
        console.log('check result : ', convertResult)

    }, [lists])
    return (
        <Grid2 container direction="column" gap={2} size={4} sx={{ bgcolor: 'primary.light', borderRadius: '15px', p: 3 }}>
            <Typography variant="h5" fontWeight="bold" >Income Overview</Typography>
            <Typography variant="h4" color="text.primary" fontWeight="light">3,500 THB</Typography>
            <Stack direction="row" height="10px" borderRadius={20} overflow="hidden" gap="2px">
                {
                    guageLists.map((item, index) => <Box key={index} sx={{ width: `${item.percent}%`, bgcolor: item.color, height: '10px' }}></Box>)
                }
            </Stack>
            <Grid2 container direction="row" spacing={2} justifyContent="center">

                <IncomeCategory name="Salary" value={302} percent={30.5}></IncomeCategory>
                <IncomeCategory name="Wedge" value={350} percent={32.9}></IncomeCategory>
                <IncomeCategory name="Special" value={200} percent={42.5}></IncomeCategory>
            </Grid2>
        </Grid2>
    )

}

function IncomeCategory({ name, value, percent }) {
    return (
        <Stack gap="3px" sx={{ p: 1 }}>
            <Stack direction="row" gap={1} justifyContent="center" alignItems="center">
                <Box sx={{ width: "10px", height: "10px", borderRadius: "100%", bgcolor: "red" }}></Box>
                <Typography variant="body1" fontWeight="bold">{name}</Typography>
            </Stack>
            {/* <Typography variant="body2" color="text.primary" fontWeight="light" fontSize="1.2rem">{value}</Typography> */}
            <Typography variant="body2" color="text.light" fontWeight="light" fontSize="0.9rem">{percent}%</Typography>
        </Stack>
    )
}