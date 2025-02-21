'use client'

import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAlert } from './alertContext';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    const { handleAlert } = useAlert()
    const testAlert = (type, message) => {
        handleAlert(type, message)
    }
    return (
        <div>
            <Navbar></Navbar>
            <Button onClick={() => testAlert('error', 'hello world')}>asdasd</Button>
            <Grid2 container sx={{ my: 10 }}>
                <Grid2 container gap={5} size={6} sx={{ pt: 6, pb: 10, pr: 6 }}>
                    <Typography variant='h2' fontWeight="bold">
                        Finance track app
                    </Typography>
                    <Typography variant='body1'>
                        A recent graduate with a bachelor's degree in Information Technology, bringing a strong foundation in computer skills, including Microsoft Office and web development. Recently discharged
                    </Typography>
                    <Button variant='contained' onClick={() => router.push('/auth')} sx={{ px: 5 }}>Get started</Button>
                </Grid2>
                <Grid2 size={6} padding={2}>
                    <Box sx={{ borderRadius: '20px', bgcolor: 'primary.light', width: '100%', height: '100%' }}>
                    </Box>
                </Grid2>
            </Grid2>
        </div >
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
                <Button onClick={() => router.push('/auth')} variant="outlined">Get started</Button>
            </Grid2>
        </Grid2>
    )
}


