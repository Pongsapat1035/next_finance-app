"use client"
import { useEffect, useState } from "react";

import { getDashboardData } from '@/app/finance/dashboard/actions';
import { getAllData } from "@/app/finance/dashboard/actions";
import { useAuth } from '@/app/finance/authContext';
import { getTransectionLists } from '@/app/util/ConvertData';

import dayjs from 'dayjs';
import Grid2 from '@mui/material/Grid2'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TransectionBox from "@/app/components/DashboardPage/TransectionBox";
import SpendingBox from "@/app/components/DashboardPage/SpendingBox";
import WeeklyWrapper from "@/app/components/DashboardPage/ChartWraper";
import TotalBox from '@/app/components/DashboardPage/TotalBox';
import TotalBalanceBox from './TotalBalanceBox';

function DashboardPage({ initialData }) {
    const [data, setData] = useState(initialData)
    const { user, userConfig } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        expend: 0,
        income: 0,
        balance: 0
    })
    const [monthPeriod, setMonthPeriod] = useState(dayjs())

    const handleMonthChange = (newDate) => {
        if (newDate) {
            setMonthPeriod(newDate)
            fetchData(user.uuid, newDate)
        }
    }

    const fetchData = async (uid, newDate) => {
        try {
            const selectedMonth = newDate ? newDate : monthPeriod
            const date = new Date(selectedMonth)
            const month = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })

            const result = await getAllData(uid, month)
            const convertedResult =  getTransectionLists(result)
            setData(convertedResult)
        } catch (error) {
            console.log(error)
        }
    }

    const getNewDashboardData = async () => {
        const dashboardData = await getDashboardData(data)
        setDashboardData(dashboardData)
    }

    useEffect(() => {
        if (data.length > 0) {
            getNewDashboardData()
        } else {
            setDashboardData({
                income: 0,
                expend: 0,
                balance: 0
            })
        }
    }, [data])

    return (
        <>
            <Box height="100vh" py={2}>
                <Grid2 container direction="row" spacing={3} sx={{ width: '100%' }}>
                    <Grid2 size={{ xs: 12, sm: 7, lg: 8 }}>
                        <Stack spacing={3} sx={{ height: '100%' }}>
                            <Grid2 container direction="row" spacing={3}>
                                <Grid2 size={6}>
                                    <TotalBox type="income" amout={dashboardData.income}></TotalBox>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TotalBox type="expend" amout={dashboardData.expend}></TotalBox>
                                </Grid2>
                            </Grid2>
                            <TransectionBox
                                checkLoading={isLoading}
                                setLoadingSuccess={() => setIsLoading(false)}
                                lists={data}
                                handleMonth={handleMonthChange}>
                            </TransectionBox>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ sm: 5, lg: 4 }} container direction="column" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <TotalBalanceBox amout={dashboardData.balance}></TotalBalanceBox>
                        <SpendingBox spend={dashboardData.expend} limit={userConfig.spendingLimit}></SpendingBox>
                        <WeeklyWrapper totalExpend={dashboardData.expend} lists={data} categoryLists={userConfig.expend}></WeeklyWrapper>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}

export default DashboardPage