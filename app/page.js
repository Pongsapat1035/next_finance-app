'use client'
import { Grid2, Box, Button, Modal, Typography, TextField } from '@mui/material';

import { useRouter } from "next/navigation";
import { useState } from 'react';

import { auth } from './firebase'

import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { storeCredential } from './action';

export default function Home() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [mode, SetMode] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    async function LoginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const token = result.user.accessToken
            console.log(result.user)
            await storeCredential(token)
            router.push('/finance/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (userData) => {
        const { email, password } = userData

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const token = response.user.accessToken
            // console.log(response)
            await storeCredential(token)
            console.log('login success')

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
            const token = response.user.accessToken
            await storeCredential(token)
            // console.log(response)
            console.log('register success')
        } catch (error) {
            console.log('register error : ', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Grid2 container justifyContent={"space-between"}>
                <Box>
                    <h1>Logo</h1>
                </Box>
                <Grid2 container spacing={2} sx={{ p: 2 }}>
                    <Button onClick={() => router.push('/finance/dashboard')} variant="contained">Try Demo</Button>
                    <Button onClick={handleOpen} variant="outlined">Sign in</Button>
                </Grid2>

            </Grid2>
            <Grid2 container justifyContent={"space-around"}>
                <Box>
                    Text content
                </Box>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                    </Box>
                </Modal>
            </Grid2>
            Home page
            <Button onClick={() => route.push('/auth')} variant="outlined">Sign in</Button>
        </div>
    )
}