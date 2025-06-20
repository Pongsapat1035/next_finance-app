"use client"
import { useEffect, useState } from "react";

import { getTotalTransection } from '@/app/finance/dashboard/actions';
import { getAllData } from "@/app/finance/dashboard/actions";
import { useAuth } from '@/app/finance/authContext';
import { getMonthText } from '@/app/util/ConvertData';

import dayjs from 'dayjs';
import Grid2 from '@mui/material/Grid2'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TransectionBox from "@/app/components/DashboardPage/TransectionBox";
import SpendingBox from "@/app/components/DashboardPage/SpendingBox";
import WeeklyWrapper from "@/app/components/DashboardPage/ChartWraper";
import TotalBox from '@/app/components/DashboardPage/TotalBox';
import TotalBalanceBox from "@/app/components/DashboardPage/TotalBalanceBox";
import DashboardSkeleton from "@/app/components/DashboardPage/skeleton/DashboardSkeleton";

function DashboardPage() {
  const [data, setData] = useState([])
  const { user, userConfig } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [listLoading, setListLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    expend: 0,
    income: 0,
    balance: 0
  })
  const [monthPeriod, setMonthPeriod] = useState(dayjs())

  const handleMonthChange = (newDate) => {
    if (newDate) {
      setListLoading(true)
      setMonthPeriod(newDate)
      fetchData(user.uuid, newDate)
    }
  }

  const fetchData = async (uid, newDate) => {
    try {
      const selectedMonth = newDate ? newDate : monthPeriod
      const month = getMonthText(selectedMonth)
      const result = await getAllData(uid, month)

      if (result.status === 400) throw new Error(result.message)
      const convertedResult = JSON.parse(result)
      setData(convertedResult)
      setListLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getNewDashboardData = async () => {
    const dashboardData = await getTotalTransection(data)
    setDashboardData(dashboardData)
  }

  useEffect(() => {
    if (user && user.uuid) {
      fetchData(user.uuid)
      setIsLoading(false)
    }

  }, [user])

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

  if (isLoading) return <DashboardSkeleton></DashboardSkeleton>

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
                isLoading={listLoading}
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