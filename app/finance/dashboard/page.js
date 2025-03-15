"use client"
import Grid2 from '@mui/material/Grid2'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TransectionBox from "@/app/components/DashboardPage/TransectionBox";
import SpendingBox from "@/app/components/DashboardPage/SpendingBox";
import WeeklyWrapper from "@/app/components/DashboardPage/ChartWraper";
import EditModal from '@/app/components/DashboardPage/EditModal';

import { TotalBox, TotalBalanceBox } from '@/app/components/DashboardPage/SummaryBox'

import { useEffect, useState } from "react";
import { getAllData } from "@/app/finance/dashboard/actions";
import { useAuth } from '@/app/finance/authContext';

function DashboardPage() {
  const { user, userConfig } = useAuth()
  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editData, setEditData] = useState({
    id: '',
    data: {
      type: '',
      amout: '',
      category: '',
      month: '',
      description: ''
    }
  })
  const [editModal, setEditModal] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    expend: 0,
    income: 0,
    balance: 0
  })

  const handleMonthSelect = async (month) => {
    try {
      await fetchData(userId, month)
    } catch (error) {
      console.log('error from fetch data : ', error)
    }
  }

  const fetchData = async (uid, month) => {
    try {
      const response = await getAllData(uid, month)
      const convertResponse = JSON.parse(response)

      convertResponse.forEach(element => {
        element.data.amout = parseInt(element.data.amout)
        element.data.timeStamp = element.data.createdDate.seconds
      });
      setLists(convertResponse)

    } catch (error) {
      console.log(error)
    }

  }

  const getDashboardData = () => {
    // if have data calculate total
    const expendSum = lists.filter((list) => list.data.type === 'expend').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
    const incomeSum = lists.filter((list) => list.data.type === 'income').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
    const balance = incomeSum - expendSum

    setDashboardData({
      income: incomeSum,
      expend: expendSum,
      balance: balance
    })
  }

  useEffect(() => {
    if (user) {
      const date = new Date()
      const month = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
      fetchData(user.uuid, month)
      setUserId(user.uuid)
    }
  }, [user])

  useEffect(() => {
    if (lists.length > 0) {
      getDashboardData()
    } else {
      setDashboardData({
        income: 0,
        expend: 0,
        balance: 0
      })
    }
  }, [lists])
  const handleEdit = (data) => {
    setEditData(data)
    setEditModal(!editModal)
  }

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
                lists={lists}
                handleMonth={handleMonthSelect}
                handleEdit={handleEdit}>
              </TransectionBox>
            </Stack>
          </Grid2>
          <Grid2 size={{ sm: 5, lg: 4 }} container direction="column" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <TotalBalanceBox amout={dashboardData.balance}></TotalBalanceBox>
            <SpendingBox spend={dashboardData.expend} limit={userConfig.spendingLimit}></SpendingBox>
            <WeeklyWrapper totalExpend={dashboardData.expend} lists={lists} categoryLists={userConfig.expend}></WeeklyWrapper>
          </Grid2>
        </Grid2>
        <EditModal
          state={editModal}
          closeModal={() => setEditModal(!editModal)}
          recieveData={editData}
          category={userConfig}
          uid={userId}></EditModal>
      </Box>
    </>
  )
}

export default DashboardPage