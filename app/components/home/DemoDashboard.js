"use client"
import Grid2 from '@mui/material/Grid2'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TransectionBox from "@/app/finance/dashboard/components/TransectionBox";
import SpendingBox from "@/app/finance/dashboard/components/SpendingBox";
import WeeklyWrapper from "@/app/finance/dashboard/components/ChartWraper";
import { TotalBox, TotalBalanceBox } from '@/app/finance/dashboard/components/SummaryBox'

export default function DemoDashboard() {
    const lists = [
        {
            data: {
                timeStamp: 1740843638,
                type: 'expend',
                category: 'food',
                amout: '200',
            }
        }
    ]
    const test = () => {
        return
    }
    return (
        <Box paddingTop={3}>
            <Grid2 container direction="row" spacing={2} sx={{ width: '100%' }}>
                <Grid2 size={8}>
                    <Stack spacing={3} sx={{ height: '100%' }}>
                        <Grid2 container direction="row" spacing={3}>
                            <Grid2 size={6}>
                                <TotalBox type="income" amout={200}></TotalBox>
                            </Grid2>
                            <Grid2 size={6}>
                                <TotalBox type="expend" amout={450}></TotalBox>
                            </Grid2>
                        </Grid2>
                        <TransectionBox checkLoading={false}
                            setLoadingSuccess={() => test()}
                            lists={lists} handleMonth={() => test()}
                            handleEdit={() => test()}
                        ></TransectionBox>
                    </Stack>
                </Grid2>
                <Grid2 size={4} container direction="column" spacing={3}>
                    <TotalBalanceBox amout={200} toggleModal={() => test()}></TotalBalanceBox>
                    <SpendingBox spend={200} ></SpendingBox>
                    <WeeklyWrapper totalExpend={500} lists={lists}></WeeklyWrapper>
                </Grid2>
            </Grid2>
        </Box>
    )
}
