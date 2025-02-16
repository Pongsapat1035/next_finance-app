"use client"

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import { PieChart } from '@mui/x-charts/PieChart';

const WeeklyWrapper = () => {
    return (
        <Paper sx={{ padding: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">Weekly Expense</Typography>
                {/* <Box sx={{ height: '200px', width: '100%', borderRadius: 5, bgcolor: 'primary.light' }}></Box> */}
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <Grid2 container spacing={1}>
                    <TopCategory name="Shopping"></TopCategory>
                    <TopCategory name="Shopping"></TopCategory>
                    <TopCategory name="Shopping"></TopCategory>
                    <TopCategory name="Shopping"></TopCategory>
                </Grid2>
            </Stack>
        </Paper>
    )
}

const TopCategory = ({ name }) => {
    return (
        <Grid2 size={6}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Box sx={{ width: 10, height: 10, borderRadius: 100, bgcolor: 'primary.main' }}></Box>
                <Typography variant="body1" fontWeight="bold">{name}</Typography>
            </Stack>
        </Grid2>
    )
}

export default WeeklyWrapper