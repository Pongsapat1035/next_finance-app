'use client'

import {
  Grid2,
  Paper,
} from "@mui/material";

import { InputBox, DashboardContainer, EditContainer } from "./component";
import { useAuth } from "@/app/authContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllData, deleteDocFormId } from "./actions";



export default function Dashboard() {
  const router = useRouter()

  const { user, loading } = useAuth()
  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
  const [dashboardData, setDashboardData] = useState({
    expend: 0,
    income: 0,
    change: 0
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

  const getCurrentMonth = (recieveDate) => {
    const date = recieveDate ? new Date(recieveDate * 1000) : new Date()
    const options = {
      month: 'short',
      year: 'numeric'
    }
    return date.toLocaleDateString("en-US", options)
  }

  const [monthPreriod, setMonthPreriod] = useState(getCurrentMonth())


  const fetchData = async (uid, month) => {
    const response = await getAllData(uid, month)
    const convertResponse = JSON.parse(response)

    convertResponse.forEach(element => {
      const convertDate = getCurrentMonth(element.data.createdDate.seconds)
      element.data.amout = parseInt(element.data.amout)
      element.data.timeStamp = element.data.createdDate.seconds
      element.data.month = convertDate
    });
    setLists(convertResponse)
  }

  useEffect(() => {
    if (user) {
      setUserId(user.uid)
      fetchData(user.uid, monthPreriod)
    }
  }, [user])

  useEffect(() => {
    // if has data in list
    if (lists.length > 0) {
      const expendSum = lists.filter((list) => list.data.type === 'expend').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
      const incomeSum = lists.filter((list) => list.data.type === 'income').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
      const change = incomeSum - expendSum

      setDashboardData({
        income: incomeSum,
        expend: expendSum,
        change: change
      })
    }
  }, [lists])
  console.log(lists)
  if (loading) return <p>Loading...</p>;

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
                {item.data.amout} {item.data.type} {item.data.category} {item.data.month}
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => deleteBtnIsClick(userId, item.id, monthPreriod)}>Delete</button>
              </div>
            ))}
          </Paper>
        </Grid2>
        <Grid2 size="auto">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            <Grid2 container spacing={2} direction="column">
              <InputBox configData={inputListData} uid={userId}></InputBox>
              <EditContainer data={editData} category={inputListData} uid={userId}></EditContainer>
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>

    </>
  );
}

