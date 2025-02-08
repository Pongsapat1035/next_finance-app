"use client"
import { auth } from '../firebase'
import {
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { Login, Register, storeCookie, vertifyToken } from '../auth/action';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import {
    Paper,
    Grid2,
    Button,
    Typography,
    Stack,
    Divider,
    TextField
} from '@mui/material'
import InputText from './InputText'
import ggIcon from "./icons/gg_icon.png"

export default function AuthForm() {
    const router = useRouter()
    const [mode, SetMode] = useState(false)
    const [errorEmailMsg, setErrorEmailMsg] = useState(' ')
    const [errorPassMsg, setErrorPassMsg] = useState(' ')
    const [token, setToken] = useState('')
    async function LoginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            console.log('google login', result)
            storeCookie(token)

        } catch (error) {
            console.log(error)
        }
    }

    const validateInput = (data) => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        !emailRegex.test(data.email) && data.email !== '' ? setErrorEmailMsg('email is invalid format') : setErrorEmailMsg(' ')

        const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/;  // At least one lowercase and one uppercase letter
        const hasSpecialChar = /(?=.*[@$!%*?&_-])/;       // At least one special character
        const hasMinLength = /.{8,}/;                   // At least 8 characters long

        !hasMinLength.test(data.password) && data.password !== '' ? setErrorPassMsg("At least 8 characters long") :
            !hasLowerUpper.test(data.password) && data.password !== '' ? setErrorPassMsg("At least one lowercase and one uppercase letter") :
                !hasSpecialChar.test(data.password) && data.password !== '' ? setErrorPassMsg("At least one special character") :
                    setErrorPassMsg(" ")
        if (errorEmailMsg !== " " || errorPassMsg !== " ") {
            console.log('validate fail')
            return false
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(e)
            const formData = new FormData(e.target);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password')
            }
            console.log('check user data', userData)

            if (mode === false) {
                const response = await Login(userData)
                console.log(response)
                if (response.status === 'success') {
                    setToken(response.token)
                }
            } else {
                userData.name = formData.get('name')
                const response = await Register(userData)
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
        // router.push('/finance/dashboard')
    }
    const checkVertifyToken = async () => {
        const response = await vertifyToken(token)
        console.log(response)
    }
    useEffect(() => {
        console.log('token check : ', token)
    }, [token])
    return (
        <form onSubmit={handleSubmit} >
            <Grid2 container direction="column" width="100%" spacing={1} alignItems="center">
                <Typography variant='h3' sx={{ pb: 5 }}>{mode ? 'Sign up' : 'Sign in'}</Typography>
                <InputText label='E-mail' nameTag="email" typeTag="email" errorMsg={errorEmailMsg} placeHolder="example@mail.com"></InputText>
                <InputText label='Password' nameTag="password" typeTag="password" errorMsg={errorPassMsg} placeHolder="********"></InputText>
                <input type="hidden" name="mode" value={mode} />
                {
                    mode ? <InputText label='Name' nameTag="name" typeTag="text" placeHolder="example"></InputText> : ''
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
                <Button onClick={() => checkVertifyToken()}>test vertify</Button>
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
    )
}