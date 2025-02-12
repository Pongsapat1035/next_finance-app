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
    Select,
    MenuItem,
    TextField,
    Button,
    Stack
} from "@mui/material";
import TransectionBadge from "./TransectionBadge";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { useEffect, useState } from "react";

import { getAllData, deleteDocFormId } from "@/app/finance/dashboard/actions";

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { addData, updateData } from "@/app/finance/dashboard/actions"

export default function Dashboard({ userData }) {

    const [lists, setLists] = useState([])
    const [userId, setUserId] = useState('')
    const [editModal, setEditModal] = useState(false)

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
        setLists(convertResponse)
    }

    useEffect(() => {
        if (userData) {
            setUserId(userData.uuid)
            fetchData(userData.uuid, monthPreriod)
        }

    }, [userData])

    useEffect(() => {
        // if has data in list
        // console.log('check lists : ', lists)
        if (lists.length > 0) {
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
        <Box>
            <Typography variant="h4">{userData ? `Hello, ${userData.name}` : 'No user logged in'}</Typography>

            <Grid2 container direction="row" spacing={2} sx={{ width: '100%' }}>
                <Grid2 size={7}>
                    <Stack spacing={4}>
                        <Stack direction="row" gap={2}>
                            <TotalBox type="income" amount={dashboardData.income}></TotalBox>
                            <TotalBox type="expend" amount={dashboardData.expend}></TotalBox>
                        </Stack>
                        <TransectionBox></TransectionBox>
                    </Stack>
                </Grid2>
                <Grid2 size={4} direction="column">
                    <Stack spacing={2}>
                        <TotalBalanceBox></TotalBalanceBox>
                        <SpendingBox></SpendingBox>
                        <WeeklyBox></WeeklyBox>
                    </Stack>
                </Grid2>
            </Grid2>
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

        </Box>
    );
}



function ListContainer({ data, action }) {
    // make copy data to prevent mutation
    const newData = JSON.parse(JSON.stringify(data))

    newData.forEach((item) => {
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

const TotalBox = ({ type = 'income', amount = 200 }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" columnGap={2}>
                <Stack direction="column" rowGap={2}>
                    <Typography variant="h6" color="primary.light" fontWeight="light">
                        Total.{type}
                    </Typography>
                    <Typography variant="h3">
                        $ {amount}
                    </Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: 50, height: 50 }}>
                    <img src="https://placehold.co/30"></img>
                </Stack>
            </Stack>
        </Paper>
    )
}

const TransectionBox = () => {

    function createData(name, type, fat, carbs) {
        return { name, type, fat, carbs };
    }

    const rows = [
        createData('12 Fri', 'income', 'Salary', 24, 4.0),
        createData('14 Sun', 'income', 'Special', 37, 4.3),
        createData('15 Mon', 'expend', 'Shoping', 24, 6.0),
        createData('20 Thur', 'income', 'Special', 67, 4.3),
    ];

    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">Transection</Typography>
                <Button variant="contained">Jan 25</Button>
            </Stack>
            <TableContainer>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Amout</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&hover': { bgcolor: 'primary.light' } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    <Stack alignItems="center">
                                        <TransectionBadge type={row.type}></TransectionBadge>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '0.9rem' }}>{row.fat}</TableCell>
                                <TableCell align="right"
                                    color={row.type === 'income' ? 'success.main' : 'error.main'}
                                    sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    $ {row.carbs}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

const TotalBalanceBox = ({ amout = 200 }) => {
    return (
        <Paper>
            <Stack padding={3} rowGap={2}>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: 50, height: 50 }}>
                    <img src="https://placehold.co/30"></img>
                </Stack>
                <Typography variant="h6" color="primary.light" fontWeight="light">
                    Balance
                </Typography>
                <Typography variant="h3">
                    $ {amout}
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 2 }}>
                    New transection
                </Button>
            </Stack>
        </Paper>
    )
}

const SpendingBox = () => {
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
    return (
        <Paper sx={{ p: 3 }}>
            {/* this is spendingbox */}
            <Stack spacing={1}                                  >
                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="h5">
                            Spending Limit
                        </Typography>
                        <Typography variant="body1" color="primary.light">
                            Data form 1-23 Feb 2025
                        </Typography>
                    </Stack>
                    <Button variant="outlined" sx={{ py: '5px' }}>View report</Button>
                </Stack>
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                    <Typography variant="h4">
                        250
                    </Typography>
                    <Typography variant="body1" color="primary.light">
                        of
                    </Typography>
                    <Typography variant="body1" color="primary.light">
                        4000
                    </Typography>
                </Stack>
                <Box>
                    <BorderLinearProgress variant="determinate" value={50} />
                </Box>
            </Stack>
        </Paper>
    )
}

const WeeklyBox = () => {
    return (
        <Paper>
            WeeklyBox
        </Paper>
    )
}

export const InputBox = ({ configData, uid }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const [type, setType] = useState('expend')
    const [date, setDate] = useState(dayjs())

    const handleCateChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category'),
            createdDate: data.get('date')
        }
        console.log('data from user : ', listData)
        const response = await addData(listData)
        console.log(response)
        window.location.reload()
    }
    useEffect(() => {
        // console.log(date.format())
    }, [date])
    // console.log(type)
    return (
        <Grid2 container spacing={2} direction={"column"}>
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="amout" type="number" label={type} variant="outlined" required />
                    <Select
                        name="type"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="select type" disabled>select type</MenuItem>
                        <MenuItem value="expend">expend</MenuItem>
                        <MenuItem value="income">income</MenuItem>
                    </Select>
                    <Select
                        name="category"
                        value={selectedValue}
                        onChange={handleCateChange}
                    >
                        <MenuItem value="select type" disabled>select type</MenuItem>
                        {
                            configData[type].map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                        }
                    </Select>
                    <Button type="submit" variant="contained">Add</Button>
                </Grid2>
            </form>
        </Grid2>
    )
}

export const DashboardContainer = ({ data }) => {
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

export const EditContainer = ({ recieveData, category, uid, deleteFunction }) => {
    // console.log(data)
    const data = JSON.parse(JSON.stringify(recieveData));
    const createdDate = data.data.timeStamp
    // console.log(createdDate)
    const [date, setDate] = useState(dayjs(createdDate * 1000))

    const docId = data.id
    const docData = data.data
    const [type, setType] = useState('expend')
    const [formData, setFormData] = useState({
        type: docData.type,
        category: docData.category,
        amout: docData.amout,
        month: docData.month,
    })

    const changeType = (e) => {
        setType(e.target.value)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))


    }
    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            docid: docId,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category'),
            createdDate: data.get('date')
        }
        console.log('data from user : ', listData)
        const response = await updateData(listData)
        console.log(response)
        window.location.reload()
    }


    useEffect(() => {
        // setType(docData.type)
        setFormData(prevState => ({
            ...prevState,
            type: docData.type,
            category: docData.category,
            amout: docData.amout,
            month: docData.month
        }))
        setDate(dayjs(createdDate * 1000))
    }, [recieveData])



    return (
        <div>
            <form onSubmit={submitForm}>
                <Grid2 container spacing={2} direction={"column"}>
                    <Typography variant="h2">Edit</Typography>
                    <DatePicker name="date" value={date} maxDate={dayjs()} onChange={(newValue) => setDate(newValue)} />
                    <TextField id="outlined-basic" name="amout" type="number" label="Amout" onChange={handleChange} value={formData.amout} variant="outlined" />
                    <Select name="type" value={formData.type} onChange={handleChange}>
                        <MenuItem value="expend" >expend</MenuItem>
                        <MenuItem value="income" >income</MenuItem>
                    </Select>
                    <Select name="category" value={formData.category} onChange={handleChange}>
                        <MenuItem value="select type" disabled>select type</MenuItem>
                        {
                            category[type].map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)
                        }
                    </Select>
                    <Button type="submit" variant="contained">Update</Button>
                    <Button variant="contained" onClick={() => deleteFunction(uid, docId, formData.month)}>Delete</Button>
                </Grid2>
            </form>
        </div>
    )
}

