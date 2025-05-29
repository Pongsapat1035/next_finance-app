"use client"

import { userSignout } from '@/app/auth/action'
import { useRouter } from "next/navigation"

import NavbarMobile from "../components/Navbar/NavbarMobile"
import Navbar from "../components/Navbar/Navbar"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery';

import { AuthProvider } from './authContext'
import { useAlert } from '../alertContext'

export default function HomeLayout({ children }) {
    const { handleAlert } = useAlert()
    const router = useRouter()
    // const matches = useMediaQuery('(min-width:600px)');

    const handleSignout = async () => {
        try {
            //signout and redirect to home page
            const { status } = await userSignout()
            if (status === 200) {
                handleAlert('success', 'logout success !')
                router.push('/')
            }
        } catch (error) {
            console.log('signout error : ', error)
        }
    }

    return (
        <>
            <Box width="100vw" bgcolor="background.main" sx={{ height: 'minmax(100vh, auto)' }}>
                <AuthProvider>
                    <Container>
                        <Navbar signOut={handleSignout}></Navbar>
                        <NavbarMobile signOut={handleSignout}></NavbarMobile>
                        {children}
                    </Container>
                </AuthProvider>
            </Box>
        </>
    )
}







