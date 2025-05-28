import Grid2 from '@mui/material/Grid2';
import Container from '@mui/material/Container';

import HomeNavbar from './components/HomePage/HomeNavbar';
import FirstSection from './components/HomePage/FirstSection';

export default function Home() {

    return (
        <Container>
            <HomeNavbar></HomeNavbar>
            <Grid2 container sx={{ my: { sm: 0, md: 8 } }}>
                <FirstSection></FirstSection>
            </Grid2>
        </Container >
    )
}
