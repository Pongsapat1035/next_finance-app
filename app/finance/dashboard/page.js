'use client'

import {
  Grid2,
  Paper,
  Typography,
  Modal,
  Box,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";

import { InputBox, DashboardContainer, EditContainer, AlertBox } from "./component";

import { useEffect, useState } from "react";
import { getAllData, deleteDocFormId } from "./actions";

export default function Dashboard() {


  const [lists, setLists] = useState([])
  const [userId, setUserId] = useState('')
  const [editModal, setEditModal] = useState(false)
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
    console.log(convertResponse)
    convertResponse.forEach(element => {
      const convertDate = getCurrentMonth(element.data.createdDate.seconds)
      element.data.amout = parseInt(element.data.amout)
      element.data.timeStamp = element.data.createdDate.seconds
      element.data.day = 'mart'
      element.data.month = convertDate
    });
    // console.log('check convertRes', convertResponse)
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
    console.log('check lists : ', lists)
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
    setEditModal(!editModal)
    setEditData(data)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
      <Typography variant="h4">{user ? `Hello, ${user.displayName}` : 'No user logged in'}</Typography>
      <Grid2 container spacing={6}>
        <Grid2 size={12}>
          <DashboardContainer data={dashboardData}></DashboardContainer>
        </Grid2>
        <Grid2 size="grow">
          <ListContainer data={lists} action={handleEdit}></ListContainer>
        </Grid2>
        <Grid2 size="auto">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            <Grid2 container spacing={2} direction="column">
              <InputBox configData={inputListData} uid={userId}></InputBox>
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
      <Modal
        open={editModal}
        onClose={() => setEditModal(!editModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditContainer recieveData={editData} category={inputListData} uid={userId} deleteFunction={deleteBtnIsClick}></EditContainer>
        </Box>
      </Modal>
      <AlertBox msg="test" type='error'></AlertBox>
    </>
  );
}

function ListContainer({ data, action }) {
  const newData = JSON.parse(JSON.stringify(data))
  newData.forEach((item) => {
    // console.log('check timeStamp : ', item.data.timeStamp)
    const convertToDate = new Date(item.data.timeStamp * 1000)
    const getDay = convertToDate.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' })
    item.data.day = getDay
  })

  const sortByDate = newData.sort((a, b) => b.data.day - a.data.day)
  let hasData = sortByDate.length > 0
  if (!hasData) {
    hasData = <div>No data</div>
  } else {
    hasData = ''
  }

  useEffect(() => {
    // console.log('recieve data', newData.timeStamp)
    // const date = new Date(newData.timeStamp)
    // const day = date.getDay()
    // console.log('day is ', day)
  }, [data])
  console.log(sortByDate)
  return (
    <>
      {hasData}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Date</TableCell>
              <TableCell >Type</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Amout</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortByDate.map((item, index) => (
              <TableRow key={index} onClick={() => action(item)} hover sx={{ cursor: 'pointer' }}>
                <TableCell >{item.data.day}</TableCell>
                <TableCell >{item.data.type}</TableCell>
                <TableCell align="center">{item.data.category}</TableCell>
                <TableCell align="center">{item.data.type === 'income' ? '+' : '-'} ฿ {item.data.amout}</TableCell>
              </TableRow>
              // <button onClick={() => handleEdit(item)}>Edit</button>
              // <button onClick={() => deleteBtnIsClick(userId, item.id, monthPreriod)}>Delete</button>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  )
}