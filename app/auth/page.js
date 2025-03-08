"use client"

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AuthForm from './components/AuthForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

export default function AuthenPage() {
    const paperStyle = {
        width: '100%',
        "@media (min-width:600px)": {
            width: 1 / 2
        },
        mx: 'auto',
        px: 5,
        py: 8,
    }

    return (
        <Box bgcolor="background.main">
            <Container sx={{ bgcolor: 'background.main' }}>
                <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh', bgcolor: 'background.main' }}>
                    <Paper sx={paperStyle}>
                        <AuthForm></AuthForm>
                    </Paper>
                </Stack>
            </Container>
        </Box>

    )
} 