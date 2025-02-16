"use client"
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Login, Register, storeCookie, CreateCategoryConfig } from '../auth/action';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import Grid2 from '@mui/material/Grid2'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputText from './InputText'
import ggIcon from "./icons/gg_icon.png"

export default function AuthForm() {
    const router = useRouter()
    const [mode, SetMode] = useState(false)
    const [errorEmailMsg, setErrorEmailMsg] = useState(' ')
    const [errorPassMsg, setErrorPassMsg] = useState(' ')

    async function LoginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            const userId = result.user.uid
            await CreateCategoryConfig(userId)
            console.log('google login', result)
            await storeCookie(token)
            alert('login success !!')
            router.push('/finance/dashboard')
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

        if (data.password !== '') {
            !hasMinLength.test(data.password) ? setErrorPassMsg("At least 8 characters long") :
                !hasLowerUpper.test(data.password) ? setErrorPassMsg("At least one lowercase and one uppercase letter") :
                    !hasSpecialChar.test(data.password) ? setErrorPassMsg("At least one special character") :
                        setErrorPassMsg(' ')
        }

        if (errorEmailMsg !== ' ' || errorPassMsg !== ' ') {
            console.log('validate fail')
            return false
        }
        return true


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(e)
            const formData = new FormData(e.target);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name') || ''
            }
            if (!validateInput(userData)) {
                throw new Error('validate fail!!')
            }
            const response = mode ? await Register(userData) : await Login(userData)
            alert(response.message)
            router.push('/finance/dashboard')
        } catch (error) {
            alert(error)
            console.log(error)
        }

    }

    return (
        <form onSubmit={handleSubmit} >
            <Grid2 container direction="column" width="100%" spacing={1} alignItems="center">
                <Typography variant='h3' sx={{ pb: 5 }}>{mode ? 'Sign up' : 'Sign in'}</Typography>
                <InputText label='E-mail'
                    nameTag="email"
                    typeTag="email"
                    errorMsg={errorEmailMsg}
                    placeHolder="example@mail.com">
                </InputText>
                <InputText
                    label='Password'
                    nameTag="password"
                    typeTag="password"
                    errorMsg={errorPassMsg}
                    placeHolder="********">
                </InputText>
                <input type="hidden" name="mode" value={mode} />
                {
                    mode ? <InputText
                        label='Name'
                        nameTag="name"
                        typeTag="text"
                        placeHolder="example">
                    </InputText> : ''
                }
                <Stack direction="column" spacing={2} sx={{ width: '100%', my: 3 }}>
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
    )
}