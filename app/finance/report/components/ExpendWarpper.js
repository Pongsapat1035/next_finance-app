import { Grid2, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

export default function ExpendWarpper() {
    return (
        <Grid2 container size={4} p={2} bgcolor="primary.light" borderRadius='15px'>
            <Typography variant="h5" fontWeight="bold">Expend Analysis</Typography>
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'item 1' },
                            { id: 1, value: 15, label: 'item 2' },
                            { id: 2, value: 20, label: 'item 3' },
                        ],
                        highlightScope: { fade: 'global', highlight: 'item' },
                        innerRadius: 45,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    },
                ]}
                // slotProps={{ legend: { hidden: true } }}
                width={400}
                height={200}
            />
        </Grid2>
    )

}