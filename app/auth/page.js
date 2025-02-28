"use client"

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AuthForm from './components/AuthForm';

export default function AuthenPage() {
    const paperStyle = {
        width: '50%',
        mx: 'auto',
        px: 5,
        py: 8,
    }

    return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh', }}>
            <Paper sx={paperStyle}>
                <AuthForm></AuthForm>
            </Paper>
        </Stack>
    )
} 