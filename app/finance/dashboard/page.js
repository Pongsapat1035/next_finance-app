'use client'

import {
  Grid2,
  Paper,
  Box,
  Typography,
  Button
} from "@mui/material";
import { InputBox } from "./component";
import { useAuth } from "@/app/authContext";

import { useEffect, useState } from "react";
import { getData, deleteDocFormId } from "./actions";



export default function Dashboard() {
  const { user, loading } = useAuth()
  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
  const [dashboardData, setDashboardData] = useState({
    expend: 0,
    income: 0,
    change: 0
  })

  const fetchData = async (uid) => {

    const response = await getData(uid)
    // const convert = Object.entries(response)
    const convertResponse = JSON.parse(response)
    console.log('get data', convertResponse)
    convertResponse.forEach(element => {
      element.data.amout = parseInt(element.data.amout)
      element.data.timeStamp = element.data.createdDate.seconds
    });
    setLists(convertResponse)
  }


  useEffect(() => {
    if (user) {
      setUserId(user.uid)
      fetchData(user.uid)
    }
  }, [user])

  useEffect(() => {
    if (lists.length > 0) {
      const expendSum = lists.filter((list) => list.data.type === 'expend').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
      const incomeSum = lists.filter((list) => list.data.type === 'income').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
      const change = incomeSum - expendSum
      console.log('expendSum ', expendSum)
      console.log('income ', incomeSum)

      setDashboardData({
        income: incomeSum,
        expend: expendSum,
        change: change
      })

    }
    console.log('dashboard data', dashboardData)
  }, [lists])
  if (loading) return <p>Loading...</p>;

  const inputListData = [
    {
      type: 'income',
      selectLists: ['salary', 'special']
    }, {
      type: 'expend',
      selectLists: ['food', 'entertainmen']
    }
  ]
  const deleteBtnIsClick = async (uid, docId) => {
    const response = await deleteDocFormId(uid, docId)
    if (response === 'success') {
      alert('data is deleted')
      window.location.reload()
    }
  }

  return (
    <>
      <h1>{user ? user.email : 'No user logged in'}</h1>

      <Grid2 container spacing={6}>
        <Grid2 size={12}>
          <DashboardContainer data={dashboardData}></DashboardContainer>
        </Grid2>
        <Grid2 size="grow">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            item 1
            {lists.map((item, index) => (
              <div key={index}>
                {item.data.amout} {item.data.type} {item.data.category}
                <button>Edit</button>
                <button onClick={() => deleteBtnIsClick(userId, item.id)}>Delete</button>
              </div>
            ))}
          </Paper>
        </Grid2>
        <Grid2 size="auto">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            <Grid2 container spacing={2} direction="column">
              {
                inputListData.map((data, index) => <InputBox key={index} type={data.type} uid={userId} selectLists={data.selectLists}></InputBox>)
              }
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
}

const DashboardContainer = ({ data }) => {

  return (
    <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
      <Grid2 container spacing={2}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Income</Typography>
          <Typography variant="h2">${data.income}</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Expend</Typography>
          <Typography variant="h2">${data.expend}</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Summary</Typography>
          <Typography variant="h2">${data.change}</Typography>
        </Box>
      </Grid2>
    </Paper>
  )
}

