import { Grid2, Typography, Stack, Box } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

export default function FinanceOverview() {
    return (
        <Grid2 size={4} container direction="column" bgcolor="primary.light" spacing={1} borderRadius="15px" p={2} >
            <Typography variant="h5" fontWeight="bold">Finance overview</Typography>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                    {
                        data: [3, 4, 6, 8.5, 7, 5],
                    },
                ]}
                width={350}
                height={200}
            />
        </Grid2>
    )

}