import { Grid2, Typography } from "@mui/material"
import { BarChart } from '@mui/x-charts/BarChart';

export default function TransectionChart() {
    const dataset = [
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },
        {
            x: 100,
            y: 120,
            z: 30
        },

    ]
    return (
        <Grid2 size={8} bgcolor="primary.light" sx={{ borderRadius: '20px', py:2, px: 4 }}>
            <Typography variant="h5" fontWeight="bold">Summary Chart</Typography>
            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D'] }]}
                series={[
                    { dataKey: 'x', label: 'London' },
                    { dataKey: 'y', label: 'Paris' },
                    { dataKey: 'z', label: 'New York' },
                ]}
                height={300}
            />
        </Grid2>
    )
}