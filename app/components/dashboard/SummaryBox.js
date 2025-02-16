"use client"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import IncomeIcon from '@/app/components/icons/file_download.png'
import ExpendIcon from '@/app/components/icons/file_upload.png'
import TotalIcon from '@/app/components/icons/account_balance_wallet.png'

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

export {
    TotalBalanceBox,
    TotalBox
}