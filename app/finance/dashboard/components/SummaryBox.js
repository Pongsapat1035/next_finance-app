"use client"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import IncomeIcon from '@/public/icons/file_download.png'
import ExpendIcon from '@/public/icons/file_upload.png'
import TotalIcon from '@/public/icons/account_balance_wallet.png'

import Image from "next/image";

const TotalBox = ({ type = 'income', amout = 0}) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" columnGap={2} justifyContent="space-between">
                <Stack direction="column" rowGap={2}>
                    <Typography variant="h6" color="primary.light" fontWeight="light">
                        Total.{type}
                    </Typography>
                    <Stack direction="row" gap={2}>
                        <Typography variant="h3" >
                            THB
                        </Typography>
                        <Typography variant="h3" color={type === 'income' ? 'success.main' : 'error.main'}>{amout}</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: 50, height: 50 }}>
                    <Image src={type === 'income' ? IncomeIcon : ExpendIcon} alt={type + '-icon'}></Image>
                </Stack>
            </Stack>
        </Paper>
    )
}

const TotalBalanceBox = ({ amout = 0, toggleModal }) => {
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
                <Stack direction="row" gap={2} >
                    <Typography variant="h3" >
                        THB
                    </Typography>
                    <Typography variant="h3" >{amout}</Typography>
                </Stack>
                <Button variant="contained" sx={{ borderRadius: 2 }} onClick={toggleModal}>
                    New transection
                </Button>
            </Stack>
        </Paper>
    )
}

export {
    TotalBalanceBox,
    TotalBox
}