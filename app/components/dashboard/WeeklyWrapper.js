"use client"

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import { PieChart } from '@mui/x-charts/PieChart';

import { useEffect, useState } from 'react';

const WeeklyWrapper = ({ totalExpend, lists, categoryLists }) => {
    // console.log('total expend ', totalExpend)
    // console.log('recieved lists : ', lists)
    // console.log('category lists : ', categoryLists)
    const [dataLists, setDataLists] = useState([
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ])

    const sortLists = (recieveData) => {
        const result = {}
        recieveData.forEach(element => {
            const data = element.data
            if (data.type === 'expend') {
                result[data.category] = result[data.category] ? result[data.category] += data.amout : data.amout
            }
        });
        console.log('result : ', result)
        let convertResult = Object.entries(result).map((item, index) => {
            return { id: index, value: item[1], label: item[0] }
        });
        console.log('check result : ', convertResult)
        // convertResult.forEach((item) => console.log(item))
        setDataLists(convertResult)
    }
    // const test = (recieveData) => {
    //     const result = recieveData.map((item) =>{
    //         // let convertResult = {}
    //         if(item.data.type === 'expend') {
    //             return { 'category' : item.data.category, 'amout' : item.data.amout }
    //         }
    //     })
    //     console.log('check test : ', result)
    // }
    console.log(dataLists)
    useEffect(() => {
        if (lists.length > 0) {
            sortLists(lists)
            // test(lists)
        }
    }, [lists])

    return (
        <Paper sx={{ padding: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">Weekly Expense</Typography>
                <PieChart
                    series={[{ data: dataLists }]}
                    width={400}
                    height={200}
                />
                <Grid2 container spacing={1}>
                    {
                        dataLists.map((item, index) => <TopCategory key={index} name={item.label}></TopCategory>)
                    }
                </Grid2>
            </Stack>
        </Paper>
    )
}

const TopCategory = ({ name }) => {
    return (
        <Grid2 size={6}>
            <Stack direction="row" alignItems="center" spacing={2} paddingLeft={5}>
                <Box sx={{ width: 10, height: 10, borderRadius: 100, bgcolor: 'primary.main' }}></Box>
                <Typography variant="body1" fontWeight="bold">{name}</Typography>
            </Stack>
        </Grid2>
    )
}

export default WeeklyWrapper