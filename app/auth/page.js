"use client"

import { auth } from '../firebase'
import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { storeCredential } from './action';

import {
    Paper,
    Grid2,
    Button,
    Typography,
    Stack,
    Divider
} from '@mui/material'
import InputText from '../components/InputText'
import ggIcon from "../components/icons/gg_icon.png"
import CloudUploadIcon from "@mui/icons-material"
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Image from 'next/image'
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
            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
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
        <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Paper square={false} elevation={0} sx={{ width: '50%', mx: 'auto', borderRadius: '20px', px: 5, py: 8 }}>
                <form onSubmit={handleSubmit} width="300px">
                    <Grid2 container direction="column" width="100%" spacing={1} alignItems="center">
                        <Typography variant='h3' sx={{ pb: 5 }}>{mode ? 'Sign up' : 'Sign in'}</Typography>
                        <InputText label='E-mail' nameTag="email" typeTag="email" errorMsg=" " placeHolder="example@mail.com"></InputText>
                        <InputText label='Password' nameTag="password" typeTag="password" errorMsg=" " placeHolder="********"></InputText>
                        <input type="hidden" name="mode" value={mode} />
                        {
                            mode ? <InputText label='Name' nameTag="name" typeTag="text" errorMsg=" " placeHolder="example"></InputText> : ''
                        }
                        <Stack direction="column" spacing={2} sx={{ width: '100%', mb: 5 }}>
                            <Button type='submit' variant="contained" fullWidth >{mode ? 'Sign up' : 'Sign in'}</Button>
                            <Divider sx={{ width: '100%', fontWeight: 'bold' }}>Or</Divider>
                            <Button variant="contained" fullWidth disableElevation
                                sx={{ bgcolor: "#F4F4F4", color: 'primary.main' }}
                                startIcon={<Image src={ggIcon} width={20} height={20} alt="google-icon"></Image>}
                                onClick={() => LoginWithGoogle()}>
                                Login with google
                            </Button>


                        </Stack>
                        {
                            mode ?
                                <Stack gap={1} direction="row">
                                    <Typography variant='span' fontWeight="bold" onClick={() => SetMode(!mode)} sx={{ cursor: 'pointer' }}>Go back to login</Typography>
                                </Stack>
                                :
                                <Stack gap={1} direction="row">
                                    <Typography variant='span'>Don't have any account ? </Typography>
                                    <Typography variant='span' fontWeight="bold" onClick={() => SetMode(!mode)} sx={{ cursor: 'pointer' }}>Sign up</Typography>
                                </Stack>
                        }
                    </Grid2>
                </form>

            </Paper>
        </Stack>
    )
} 