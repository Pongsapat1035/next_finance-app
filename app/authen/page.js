"use client"

import { CheckAuth, SignOut } from '../actions/User'
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Paper, Grid2, TextField, Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function AuthenPage() {
    const [mode, SetMode] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    useEffect(() => {
        if (mode) {
            // register 
        }
    }, [mode])

    const provider = new GoogleAuthProvider();

    async function LoginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result.user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Paper elevation={2} sx={{ width: '50%', mx: 'auto', borderRadius: '20px' }}>
                <Grid2 container direction="column" spacing={2} sx={{ alignItems: 'center', paddingX: '1rem', paddingY: '2rem', bgcolor: '#F8FAFC' }}>
                    <Grid2 container direction="column" width="70%" alignItems="center">
                        <Typography variant='h3'>{mode ? 'Register' : 'Login'}</Typography>
                        <TextField label="E-mail" variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField>
                        {mode ? <TextField label="Name" variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField> : ''}
                        <TextField label="Password" variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField>
                        <Button variant="contained" fullWidth >{mode ? 'Register' : 'Login'}</Button>
                        <Button variant="contained" fullWidth onClick={() => LoginWithGoogle()}>Login with google</Button>
                        <Button variant="contained" fullWidth onClick={() => SetMode(!mode)}>Go to {mode ? 'Login' : 'Register'}</Button>
                    </Grid2>
                </Grid2>
            </Paper>
            Auhten page<br></br>
            <Link href="/">Home page</Link><br></br>
            <Link href="/dashboard">Dashboard</Link>
            <Button onClick={() => SignOut()}>Logout</Button>
            <Button onClick={() => CheckAuth()}>Check</Button>
        </div>
    )
} 