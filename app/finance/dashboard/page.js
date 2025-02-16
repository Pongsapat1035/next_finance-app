"use client"
import Grid2 from '@mui/material/Grid2'

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TransectionBox from "@/app/components/dashboard/TransectionBox";
import SpendingBox from "@/app/components/dashboard/SpendingBox";
import WeeklyWrapper from "@/app/components/dashboard/WeeklyWrapper";
import AddModal from "@/app/components/dashboard/AddModal";
import EditModal from "@/app/components/dashboard/EditModal";
import { TotalBox, TotalBalanceBox } from '@/app/components/dashboard/SummaryBox'

import { useEffect, useState } from "react";
import { getAllData, deleteDocFormId, loadCategory } from "@/app/finance/dashboard/actions";
import { useAuth } from '../authContext';

export default function Page() {
  const user = useAuth()

  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
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
  const toggleNewModal = () => setNewTranModal(!newTranModal)
  const toggleEditModal = () => setEditModal(!editModal)

  const handleMonthSelect = async (month) => {
    try {
      console.log('load data from : ', month)
      await fetchData(userId, month)
    } catch (error) {
      console.log('error from fetch data : ', error)
    }
  }

  const fetchData = async (uid, month) => {
    const response = await getAllData(uid, month)
    const fetchCategory = await loadCategory(uid)
    const convertResponse = JSON.parse(response)
    // console.log('check fetch result : ', convertResponse)
    convertResponse.forEach(element => {
      element.data.amout = parseInt(element.data.amout)
      element.data.timeStamp = element.data.createdDate.seconds
    });
    setLists(convertResponse)
    setCategoryLists(fetchCategory)
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
  console.log('check cat', categoryLists)
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

  const inputListData = {
    income: ['salary', 'special'],
    expend: ['food', 'entertainmen']
  }

  const deleteBtnIsClick = async (uid, docId, month) => {
    const response = await deleteDocFormId(uid, docId, month)
    if (response === 'success') {
      alert('data is deleted')
      window.location.reload()
    }
  }

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
            <TransectionBox lists={lists} handleMonth={handleMonthSelect} handleEdit={handleEdit}></TransectionBox>
          </Stack>
        </Grid2>
        <Grid2 size={4} container direction="column" spacing={3}>
          <TotalBalanceBox amout={dashboardData.balance} toggleModal={toggleNewModal}></TotalBalanceBox>
          <SpendingBox spend={dashboardData.expend}></SpendingBox>
          <WeeklyWrapper></WeeklyWrapper>
        </Grid2>
      </Grid2>
      <EditModal
        state={editModal}
        toggleState={toggleEditModal}
        recieveData={editData}
        category={categoryLists}
        handleDelete={deleteBtnIsClick}
        uid={userId}>
      </EditModal>
      <AddModal state={newTranModal} setState={toggleNewModal} configData={categoryLists} uid={userId}></AddModal>
    </Box>
  )
}