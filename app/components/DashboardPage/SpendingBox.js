"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button';

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

const SpendingBox = ({ spend, limit }) => {

    const router = useRouter()
    const [progressValue, setProgressValue] = useState(0)
    const [dateText, setDateText] = useState('')

    useEffect(() => {
        let progressPercent = Math.floor((spend / limit) * 100)
        progressPercent = progressPercent > 100 ? 100 : progressPercent

        setProgressValue(progressPercent)
        const date = new Date()
        const convertDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        setDateText(convertDate)
    }, [spend, limit])

    return (
        <Paper sx={{ p: 3 }}>
            <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="h5" fontWeight="bold">
                            Spending Limit
                        </Typography>
                        <Typography variant="body1" color="text.light">
                            Data form 1 - {dateText}
                        </Typography>
                    </Stack>
                    <Button variant="outlined" sx={{ height: 40, py: '0px', borderColor: 'primary.light' }} onClick={() => router.push('/finance/report')}>View report</Button>
                </Stack>
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                    <Typography variant="h4">
                        {spend.toLocaleString()}
                    </Typography>
                    <Typography variant="body1" color="text.light">
                        of
                    </Typography>
                    <Typography variant="body1" color="text.light">
                        {limit.toLocaleString()}
                    </Typography>
                </Stack>
                <Box>
                    <BorderLinearProgress variant="determinate" value={progressValue} />
                </Box>
            </Stack>
        </Paper>
    )
}
export default SpendingBox