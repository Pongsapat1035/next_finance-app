"use client"
import Grid2 from "@mui/material/Grid2";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack'
import NextIcon from '@/public/icons/nextjs_icon_dark.svg'
import FirebaseIcon from '@/public/icons/firebase.svg'
import MaterialIcon from '@/public/icons/materialui.svg'
import Image from 'next/image'
import LoadingScreen from "../LoadingScreen";

import { Login } from "@/app/auth/action";
import { useState } from "react";
import { useAlert } from "@/app/alertContext";
import { useRouter } from "next/navigation";

export default function FirstSection() {
    const [loadingScreenState, setLoadingScreenState] = useState(false)
    const router = useRouter()
    const { handleAlert } = useAlert()
    const techStack = [
        {
            icon: NextIcon,
            name: 'Next Js'
        },
        {
            icon: FirebaseIcon,
            name: 'Firebase'
        },
        {
            icon: MaterialIcon,
            name: 'Material UI'
        }
    ]

    const signInDemo = async () => {
        try {
            setLoadingScreenState(true)
            const { status, message } = await Login({ email: "demo@demo.com", password: "Demo_password" })
            if (status !== 200) throw new Error(message)

            handleAlert('success', "Welcome to your demo account")
            router.push('/finance/dashboard')
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingScreenState(false)
        }
    }

    return (
        <Grid2 container alignItems="center" justifyContent="center" height="60vh" mb={8} sx={{
            height: {
                xs: 'auto',
                md: '60vh'
            }
        }}>
            <Grid2 direction="column" container size={{ xs: 12, sm: 8 }} gap={5} alignItems="center" width="100%" p={2}>
                <Typography variant='h1' fontWeight="bold" textAlign="center">Finance track app</Typography>
                <Typography variant='body2' textAlign="center" color="text.light">
                    <Typography variant="body2" fontWeight="bold">Finance Tracker</Typography> is a web application designed to help you track your expenses and income effortlessly.
                    With an intuitive dashboard, you can visualize your financial data,
                    set spending limits, and manage transactions in one place.
                </Typography>
                <Stack direction="row" gap={5} justifyContent="center">
                    {
                        techStack.map((item, index) => (
                            <Stack key={index} direction="row" alignItems='center' gap={2}>
                                <Image src={item.icon} width='50' alt="next-icon" ></Image>
                                <Typography variant='body1' fontWeight="bold" sx={{ display: { xs: 'none', sm: 'block' } }}>{item.name}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
                <Button variant='contained' onClick={signInDemo} sx={{ px: 4, width: '200px', borderRadius: '10px' }}>Try demo project</Button>
            </Grid2>
            {
                loadingScreenState ? <LoadingScreen></LoadingScreen> : ""
            }
        </Grid2>
    )
}
