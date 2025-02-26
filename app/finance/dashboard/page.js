"use client"
import Grid2 from '@mui/material/Grid2'

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TransectionBox from "@/app/finance/dashboard/components/TransectionBox";
import SpendingBox from "@/app/finance/dashboard/components/SpendingBox";
import WeeklyWrapper from "@/app/finance/dashboard/components/WeeklyWrapper";
import AddModal from "@/app/finance/dashboard/components/AddModal";
import EditModal from "@/app/finance/dashboard/components/EditModal";
import { TotalBox, TotalBalanceBox } from '@/app/finance/dashboard/components/SummaryBox'

import { useEffect, useState } from "react";
import { getAllData, deleteDocFormId, loadUserConfig } from "@/app/finance/dashboard/actions";
import { useAuth } from '../authContext';

export default function Page() {
  const user = useAuth()
  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editModal, setEditModal] = useState(false)
  const [newTranModal, setNewTranModal] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    expend: 0,
    income: 0,
    balance: 0
  })
  const [editData, setEditData] = useState({
    id: '',
    data: {
      type: '',
      amout: '',
      category: '',
      month: '',
    }
  })
  const [categoryLists, setCategoryLists] = useState({
    expend: [],
    income: []
  })

  const handleMonthSelect = async (month) => {
    try {
      console.log('load data from : ', month)
      await fetchData(userId, month)
    } catch (error) {
      console.log('error from fetch data : ', error)
    }
  }

  const fetchData = async (uid, month) => {
    try {
      const response = await getAllData(uid, month)
      const fetchCategory = await loadUserConfig(uid)
      const convertResponse = JSON.parse(response)

      convertResponse.forEach(element => {
        element.data.amout = parseInt(element.data.amout)
        element.data.timeStamp = element.data.createdDate.seconds
      });
      setLists(convertResponse)
      setIsLoading(false)
      setCategoryLists(fetchCategory)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    // fetch data from first load
    if (user) {
      const date = new Date()
      const month = date.toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
      fetchData(user.uuid, month)
      setUserId(user.uuid)
    }
  }, [user])

  useEffect(() => {
    if (lists.length > 0) {
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
  }, [lists])

  const handleEdit = (data) => {
    setEditData(data)
    setEditModal(!editModal)
  }

  return (
    <Box paddingTop={3}>
      <Grid2 container direction="row" spacing={3} sx={{ width: '100%' }}>
        <Grid2 size={8}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            <Grid2 container direction="row" spacing={3}>
              <Grid2 size={6}>
                <TotalBox type="income" amount={dashboardData.income}></TotalBox>
              </Grid2>
              <Grid2 size={6}>
                <TotalBox type="expend" amount={dashboardData.expend}></TotalBox>
              </Grid2>
            </Grid2>
            <TransectionBox checkLoading={isLoading} lists={lists} handleMonth={handleMonthSelect} handleEdit={handleEdit}></TransectionBox>
          </Stack>
        </Grid2>
        <Grid2 size={4} container direction="column" spacing={3}>
          <TotalBalanceBox amout={dashboardData.balance} toggleModal={() => setNewTranModal(!newTranModal)}></TotalBalanceBox>
          <SpendingBox spend={dashboardData.expend} limit={categoryLists.spendingLimit}></SpendingBox>
          <WeeklyWrapper totalExpend={dashboardData.expend} lists={lists} categoryLists={categoryLists.expend}></WeeklyWrapper>
        </Grid2>
      </Grid2>
      <EditModal
        state={editModal}
        closeModal={() => setEditModal(!editModal)}
        recieveData={editData}
        category={categoryLists}

        uid={userId}
      >
      </EditModal>
      <AddModal
        state={newTranModal}
        closeModal={() => setNewTranModal(!newTranModal)}
        configData={categoryLists}
        uid={userId}></AddModal>
    </Box>
  )
}
