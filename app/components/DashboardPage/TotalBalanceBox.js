"use client"
import { useAuth } from "@/app/finance/authContext"
import Image from "next/image";

import TotalIcon from '@/public/icons/account_balance_wallet.png'
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper'
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"

export default function TotalBalanceBox({ amout = 0 }) {
    const { toggleCreateModal } = useAuth()

    return (
        <Paper>
            <Stack padding={3} rowGap={1}>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: 50, height: 50 }}>
                    <Image src={TotalIcon} alt="total-icon"></Image>
                </Stack>
                <Typography variant="h6" color="text.light" fontWeight="light">
                    Total.balance
                </Typography>
                <Stack direction="row" gap={2} >
                    <Typography variant="h3" >
                        THB
                    </Typography>
                    <Typography variant="h3" >{amout.toLocaleString()}</Typography>
                </Stack>
                <Button variant="contained" sx={{ borderRadius: 2 }} onClick={toggleCreateModal}>
                    New transection
                </Button>
            </Stack>
        </Paper>
    )
}