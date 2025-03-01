'use client'

import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { useRouter } from "next/navigation";
import { Group } from '@mui/icons-material';
import Image from 'next/image'

import DasboardImage from '@/public/icons/dashboard.png'
import WindowMockUp from './components/WindowMockup';
export default function Home() {
    const router = useRouter()


    return (
        <Container>
            <Navbar></Navbar>

            <Grid2 container sx={{ my: 10 }}>
                <FirstSection></FirstSection>
                <WindowMockUp>
                    <Box>Content</Box>
                </WindowMockUp>
            </Grid2>
        </Container >
    )
}
import Stack from '@mui/material/Stack'
import NextIcon from '@/public/icons/nextjs_icon_dark.svg'
import FirebaseIcon from '@/public/icons/firebase.svg'
import MaterialIcon from '@/public/icons/materialui.svg'

const FirstSection = () => {
    return (
        <Grid2 container alignItems="center" justifyContent="center" height="60vh" mb={8}>
            <Grid2 direction="column" container size={8} gap={5} alignItems="center">
                <Typography variant='h1' fontWeight="bold">Finance track app</Typography>
                <Typography variant='body1' textAlign="center">
                    Lorem Ipsum is simply dummy text of the printing and  typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of  type and scrambled it to make
                </Typography>
                <Stack direction="row" gap={5} justifyContent="center">
                    <Stack direction="row" alignItems='center' gap={2}>
                        <Image src={NextIcon} width='50' alt="next-icon"></Image>
                        <Typography variant='body1' fontWeight="bold">Next js</Typography>
                    </Stack>
                    <Stack direction="row" alignItems='center' gap={2}>
                        <Image src={FirebaseIcon} width='50' alt="next-icon"></Image>
                        <Typography variant='body1' fontWeight="bold">Firebase</Typography>
                    </Stack>
                    <Stack direction="row" alignItems='center' gap={2}>
                        <Image src={MaterialIcon} width='50' alt="next-icon"></Image>
                        <Typography variant='body1' fontWeight="bold">Material UI</Typography>
                    </Stack>
                </Stack>
                <Button variant='contained' onClick={() => router.push('/auth')} sx={{ px: 4, width: '200px', borderRadius: '10px' }}>Try demo project</Button>
            </Grid2>

        </Grid2>
    )
}

const Navbar = () => {
    const router = useRouter()
    return (
        <Grid2 container alignItems="center" justifyContent={"space-between"} paddingY={2}>
            <Box>
                <Typography variant='h4' fontWeight="bold">Finance</Typography>
            </Box>
            <Grid2 container spacing={2} sx={{ p: 2 }}>
                <Button variant='contained' onClick={() => router.push('/auth')} sx={{ px: 4 }}>Get start</Button>
            </Grid2>
        </Grid2>
    )
}


