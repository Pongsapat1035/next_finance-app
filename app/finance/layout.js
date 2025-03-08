"use client"

import { userSignout } from "../auth/action"
import { AuthProvider } from './authContext'
import Navbar from "./components/Navbar"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { useAlert } from "../alertContext"
import { useRouter } from "next/navigation"
import useMediaQuery from '@mui/material/useMediaQuery';
import SpeedDialNav from "./components/SpeedDialNav"

export default function HomeLayout({ children }) {
    const router = useRouter()
    const { handleAlert } = useAlert()
    const matches = useMediaQuery('(min-width:600px)');
    const handleSignout = async () => {
        try {
            //signout and redirect to home page
            const { status } = await userSignout()
            if (status === 200) {
                console.log('user sign out')
                handleAlert('success', 'logout success !')
                router.push('/')
            }
        } catch (error) {
            console.log('signout error : ', error)
        }
    }

    return (
        <>
            <Box width="100vw" height="100vh" bgcolor="background.main" py={2}>
                <AuthProvider>
                    <Container>
                        {
                            matches ? <Navbar signOut={handleSignout}></Navbar> : <SpeedDialNav signOut={handleSignout}></SpeedDialNav>
                        }
                        {children}
                    </Container>
                </AuthProvider>
            </Box>
        </>
    )
}
