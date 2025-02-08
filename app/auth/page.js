"use client"
import { Paper, Stack } from '@mui/material'
import AuthForm from '../components/AuthForm';
import { testEnv } from '../action';
// import { useEffect } from 'react';
export default function AuthenPage() {

    console.log(process.env.NEXT_PUBLIC_FB_APIKEY)

    return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Paper sx={{ width: '50%', mx: 'auto', px: 5, py: 8 }}>
                <AuthForm></AuthForm>
            </Paper>
        </Stack>
    )
} 