"use client"
import { auth } from '@/app/firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Login, Register, storeCookie, CreateUserConfig } from '../action';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import Grid2 from '@mui/material/Grid2'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputText from './InputText'
import ggIcon from "@/public/icons/gg_icon.png"

import { useAlert } from '@/app/alertContext';
import { validateEmail, validatePassword, validateName } from "@/app/util/Validation"

export default function AuthForm() {
    const router = useRouter()
    const { handleAlert } = useAlert()
    const [mode, SetMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [validateInput, setValidateInput] = useState({
        emailMsg: null,
        passMsg: null,
        nameMsg: null
    })

    async function LoginWithGoogle() {
        try {
            setGoogleLoading(true)
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            const userId = result.user.uid
            await CreateUserConfig(userId)

            await storeCookie(token)
            handleAlert('success', 'Login success')
            setGoogleLoading(!googleLoading)
            router.push('/finance/dashboard')

        } catch (error) {
            setGoogleLoading(false)
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            const allEmptyError = Object.values(validateInput).every(val => val === null);
            if (!allEmptyError)
                throw new Error("Please check all input again!")

            const formData = new FormData(e.target);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name') || ''
            }
            const response = mode ? await Register(userData) : await Login(userData)

            if (response.status === 200) {
                handleAlert('success', `Welcome ${response.name}`)
                router.push('/finance/dashboard')
            } else {
                throw new Error(response.message)
            }

        } catch (error) {
            setIsLoading(false)
            handleAlert('error', error.message)
            console.log(error)
        }

    }

    const handleInputChange = (item) => {
        const name = item.name
        const value = item.value
        setInputValue(prevState => ({
            ...prevState,
            [name]: value
        }))

        switch (name) {
            case 'email':
                setValidateInput(prev => ({ ...prev, emailMsg: validateEmail(value) }))
                break
            case 'password':
                setValidateInput(prev => ({ ...prev, passMsg: validatePassword(value) }))
                break
            default:
                setValidateInput(prev => ({ ...prev, nameMsg: validateName(value) }))
        }
    }

    const resetInputAndError = () => {
        setInputValue(prevState => ({
            ...prevState,
            email: '',
            password: '',
            name: ''
        }))
        setValidateInput(prevState => ({
            ...prevState,
            emailMsg: ' ',
            passMsg: ' ',
            nameMsg: ' '
        }))
    }

    useEffect(() => {
        resetInputAndError()
    }, [mode])

    return (
        <form onSubmit={handleSubmit} >
            <Grid2 container direction="column" width="100%" spacing={1} alignItems="center">
                <Typography variant='h3' sx={{ pb: 5 }}>{mode ? 'Sign up' : 'Sign in'}</Typography>
                <InputText label='E-mail'
                    nameTag="email"
                    typeTag="email"
                    errorMsg={validateInput.emailMsg}
                    placeHolder="example@mail.com"
                    onChange={handleInputChange}
                    value={inputValue.email}>
                </InputText>
                <InputText
                    label='Password'
                    nameTag="password"
                    typeTag="password"
                    errorMsg={validateInput.passMsg}
                    placeHolder="********"
                    onChange={handleInputChange}
                    value={inputValue.password}>
                </InputText>
                <input type="hidden" name="mode" value={mode} />
                {
                    mode ? <InputText
                        label='Name'
                        nameTag="name"
                        typeTag="text"
                        placeHolder="example"
                        errorMsg={validateInput.nameMsg}
                        onChange={handleInputChange}
                        value={inputValue.name}>
                    </InputText> : ''
                }
                <Stack direction="column" spacing={2} sx={{ width: '100%', my: 3 }}>
                    <Button type='submit' loading={isLoading} variant="contained" fullWidth >{mode ? 'Sign up' : 'Sign in'}</Button>
                    <Divider sx={{ width: '100%', fontWeight: 'bold' }}>Or</Divider>
                    <Button variant="contained" fullWidth disableElevation loading={googleLoading}
                        sx={{ bgcolor: "#F4F4F4", color: 'primary.main' }}
                        startIcon={!googleLoading ? <Image src={ggIcon} width={20} height={20} alt="google-icon"></Image> : ""}
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