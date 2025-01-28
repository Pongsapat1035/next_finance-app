"use client"

import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";

import { Paper, Grid2, TextField, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { storeCredential } from './action';
import Link from 'next/link'

export default function AuthenPage() {
    const router = useRouter()
    const [mode, SetMode] = useState(false)


    async function LoginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider)
            console.log(result.user)
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (userData) => {
        const { email, password } = userData

        try {
            // setPersistence(auth, browserLocalPersistence).then(async () => {
            //     console.log('create persistion')
            //     const response = await signInWithEmailAndPassword(auth, email, password)
            //     console.log('login result', response)
            //     return response
            // }).catch((error)=>{
            //     console.log(error)
            // })

            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
            // await storeCredential(uid)
            console.log(response)
        } catch (error) {
            console.log('login error : ', error)
        }
    }

    const register = async (userData) => {
        const { email, password, name } = userData

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const updateUserInfo = await updateProfile(auth.currentUser, {
                displayName: name
            })
            const uid = response.user.uid
            await storeCredential(uid)
            console.log(response)
        } catch (error) {
            console.log('register error : ', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log('submitted data : ', formData)
        // console.log(formData.get('email'))
        const userData = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        if (mode === false) {
            await login(userData)
        } else {
            userData.name = formData.get('name')
            await register(userData)
        }
        router.push('/finance/dashboard')
    }

    return (
        <div>
            <Paper elevation={2} sx={{ width: '50%', mx: 'auto', borderRadius: '20px' }}>
                <Grid2 container direction="column" spacing={2} sx={{ alignItems: 'center', paddingX: '1rem', paddingY: '2rem', bgcolor: '#F8FAFC' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid2 container direction="column" spacing={2} alignItems="center">
                            <Typography variant='h3'>{mode ? 'Register' : 'Login'}</Typography>
                            <TextField name='email' label="E-mail" type='email' variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField>
                            <input type="hidden" name="mode" value={mode} />
                            {mode ? <TextField label="Name" name="name" variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField> : ''}
                            <TextField label="Password" name="password" type="password" variant="outlined" fullWidth sx={{ bgcolor: 'white' }}></TextField>
                            <Button type='submit' variant="contained" fullWidth >{mode ? 'Register' : 'Login'}</Button>
                            <Button variant="contained" fullWidth onClick={() => LoginWithGoogle()}>Login with google</Button>
                            <Button variant="contained" fullWidth onClick={() => SetMode(!mode)}>Go to {mode ? 'Login' : 'Register'}</Button>
                        </Grid2>
                    </form>
                </Grid2>
            </Paper>
            Auhten page<br></br>
            <Link href="/">Home page</Link><br></br>
            <Link href="/finance/dashboard">Dashboard</Link>
            <Button onClick={() => testLogin()}>Test login</Button>
        </div>
    )
} 