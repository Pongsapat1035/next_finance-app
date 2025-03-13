"use client"

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import { PieChart } from '@mui/x-charts/PieChart';

import { useEffect, useState } from 'react';
import { ChangeFormatChartData } from '@/app/util/FormatChart';

const ChartWrapper = ({ lists }) => {
    const [dataLists, setDataLists] = useState([])

    useEffect(() => {
        if (lists.length > 0) {
            const result = ChangeFormatChartData(lists)
            setDataLists(result)
        }
    }, [lists])

    return (
        <Paper sx={{ padding: 4, flexGrow: 1 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">Expense overall</Typography>
                {
                    dataLists.length > 0 ?
                        <PieChart
                            series={[{
                                data: dataLists,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                innerRadius: 45,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                cx: 200,
                                valueFormatter: (v, { dataIndex }) => {
                                    return `${dataLists[dataIndex].name} : ${dataLists[dataIndex].value} THB`;
                                },
                            }]}
                            slotProps={{
                                legend: { hidden: true },
                              }}
                            width={400}
                            height={200}
                        />
                        :
                        <Stack justifyContent="center" alignItems="center" sx={{ borderRadius: '20px', bgcolor: 'primary.main', p: 4 }}>
                            <Typography variant='h6' fontWeight="bold" color='background.paper'>No data</Typography>
                        </Stack>
                }

                <Grid2 container spacing={1}>
                    {
                        dataLists.map((item, index) => <TopCategory key={index} name={item.name} color={item.color}></TopCategory>)
                    }
                </Grid2>
            </Stack>
        </Paper>
    )
}

const TopCategory = ({ name, color }) => {
    return (
        <Grid2 size={6}>
            <Stack direction="row" alignItems="center" spacing={2} paddingLeft={5}>
                <Box sx={{ width: 10, height: 20, borderRadius: 100, bgcolor: color }}></Box>
                <Typography variant="body1" fontWeight="bold">{name}</Typography>
            </Stack>
        </Grid2>
    )
}

export default ChartWrapper