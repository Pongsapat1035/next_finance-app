import { Box, Paper, Typography, Grid2 } from "@mui/material"
import { Close, Done } from '@mui/icons-material';
export default function AlertBadge({ type, msg }) {
    // const style = 

    // }
    const symbol = type === 'error' ? <Close></Close> : <Done></Done>

    return (
        <Paper elevation={1} sx={{ width: 1 / 3, borderRadius: 5 }}>
            <Grid2 container spacing={2}>
                <Grid2 container justifyContent="center" alignItems="center" >
                    {/* <Close></Close> */}

                    <Box sx={{ p: 1,  border: 1, borderRadius: '50%' }}>
                        {symbol}
                    </Box>
                </Grid2>
                <Grid2>
                    <Typography>{type}</Typography>
                    {msg}
                </Grid2>
            </Grid2>
        </Paper>
    )
}