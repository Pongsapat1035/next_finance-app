'use client'

import {
    Grid2,
    Paper,
    Typography,
    Box,
    Button,
    Stack
} from "@mui/material";

import TransectionBox from "./dashboard/TransectionBox";
import SpendingBox from "./dashboard/SpendingBox";
import WeeklyWrapper from "./dashboard/WeeklyWrapper";
import { useEffect, useState } from "react";

import { getAllData, deleteDocFormId } from "@/app/finance/dashboard/actions";

import AddModal from "./dashboard/AddModal";
import EditModal from "./dashboard/EditModal";

export default function Dashboard({ userData }) {

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
    const toggleNewModal = () => setNewTranModal(!newTranModal)
    const toggleEditModal = () => setEditModal(!editModal)
    const handleMonthSelect = async (month) => {
        // console.log('recieved month : ', month)
        try {
            console.log('load data from : ', month)
            await fetchData(userId, month)
        } catch (error) {
            console.log('error from fetch data : ', error)
        }
    }
    const getCurrentMonth = (recieveDate) => {
        const date = recieveDate ? new Date(recieveDate * 1000) : new Date()
        const options = {
            month: 'short',
            year: 'numeric'
        }
        return date.toLocaleDateString("en-US", options)
    }

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
        }
    }, [userData])

    useEffect(() => {
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
                category={inputListData}
                handleDelete={deleteBtnIsClick}>
            </EditModal>
            <AddModal state={newTranModal} setState={toggleNewModal} configData={inputListData} uid={userId}></AddModal>
        </Box>
    );
}

import IncomeIcon from '@/app/components/icons/file_download.png'
import ExpendIcon from '@/app/components/icons/file_upload.png'
import Image from "next/image";

const TotalBox = ({ type = 'income', amount = 200 }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" columnGap={2} justifyContent="space-between">
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
                    <Image src={type === 'income' ? IncomeIcon : ExpendIcon} alt={type + '-icon'}></Image>
                </Stack>
            </Stack>
        </Paper>
    )
}

import TotalIcon from '@/app/components/icons/account_balance_wallet.png'

const TotalBalanceBox = ({ amout = 200, toggleModal }) => {
    return (
        <Paper>
            <Stack padding={3} rowGap={1}>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: 50, height: 50 }}>
                    <Image src={TotalIcon} alt="total-icon"></Image>
                </Stack>
                <Typography variant="h6" color="primary.light" fontWeight="light">
                    Total.balance
                </Typography>
                <Typography variant="h3">
                    $ {amout}
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 2 }} onClick={toggleModal}>
                    New transection
                </Button>
            </Stack>
        </Paper>
    )
}


