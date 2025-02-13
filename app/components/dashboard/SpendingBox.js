"use client"

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button';

const SpendingBox = ({ spend = 0 }) => {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800],
            }),
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#FBA957',
            ...theme.applyStyles('dark', {
                backgroundColor: '#FBA957',
            }),
        },
    }));
    return (
        <Paper sx={{ p: 3 }}>
            {/* this is spendingbox */}
            <Stack spacing={1}                                  >
                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="h5" fontWeight="bold">
                            Spending Limit
                        </Typography>
                        <Typography variant="body1" color="primary.light">
                            Data form 1-23 Feb 2025
                        </Typography>
                    </Stack>
                    <Button variant="outlined" sx={{ py: '0px' }}>View report</Button>
                </Stack>
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                    <Typography variant="h4">
                        {spend}
                    </Typography>
                    <Typography variant="body1" color="primary.light">
                        of
                    </Typography>
                    <Typography variant="body1" color="primary.light">
                        4000
                    </Typography>
                </Stack>
                <Box>
                    <BorderLinearProgress variant="determinate" value={50} />
                </Box>
            </Stack>
        </Paper>
    )
}
export default SpendingBox