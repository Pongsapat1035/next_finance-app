'use client'
import { Grid2, Box, Button, Modal, Typography, TextField, Link } from '@mui/material';

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
import AuthenForm from './components/AuthenForm'
import { AlertBox } from './finance/dashboard/component';
import AlertBadge from './components/Alert'

export default function Home() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
    const register = async (userData) => {
        const { email, password, name } = userData

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
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
            <AuthenForm status={open} ModalHandle={handleClose} formHandle={handleSubmit} login={LoginWithGoogle}></AuthenForm>
            Home page
            <AlertBadge type="error" msg="Test msg"></AlertBadge>
        </div >
    )
}



