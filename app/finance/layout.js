"use client"
import NavbarMobile from "../components/Navbar/NavbarMobile"
import Navbar from "../components/Navbar/Navbar"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { AuthProvider } from './authContext'

export default function HomeLayout({ children }) {
    return (
        <>
            <Box width="100vw" bgcolor="background.main" sx={{ minHeight: '100vh' }}>
                <AuthProvider>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Navbar></Navbar>
                        {children}
                        <Box height={80} sx={{ display: { xs: 'block', sm: 'none' } }}></Box>

                    </Container>
                    <NavbarMobile></NavbarMobile>
                </AuthProvider>
            </Box>

        </>
    )
}







