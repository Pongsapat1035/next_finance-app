"use client"
import { Paper, Stack } from '@mui/material'
import AuthForm from '../components/AuthForm';


export default function AuthenPage() {


    return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Paper sx={{ width: '50%', mx: 'auto', px: 5, py: 8 }}>
                <AuthForm></AuthForm>
            </Paper>
        </Stack>
    )
} 