'use client'

import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';

import HomeNavbar from './components/home/HomeNavbar';
import FirstSection from './components/home/FirstSection';

export default function Home() {

    return (
        <Container>
            <HomeNavbar></HomeNavbar>
            <Grid2 container sx={{ my: { sm: 0, md: 8 } }}>
                <FirstSection></FirstSection>
                {/* <WindowMockUp>
                    <DemoDashboard></DemoDashboard>
                </WindowMockUp> */}
            </Grid2>
        </Container >
    )
}
