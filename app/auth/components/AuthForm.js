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


export default function AuthForm() {
    const router = useRouter()
    const { handleAlert } = useAlert()
    const [mode, SetMode] = useState(false)

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [validateInput, setValidateInput] = useState({
        emailError: false,
        passError: false,
        nameError: false,
        emailMsg: ' ',
        passMsg: ' ',
        nameMsg: ' '
    })

    async function LoginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const token = await result.user.getIdToken()
            const userId = result.user.uid
            await CreateUserConfig(userId)
            console.log('google login', result)
            await storeCookie(token)
            handleAlert('success', 'Login success')
            router.push('/finance/dashboard')
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (validateInput.emailError || validateInput.passError || validateInput.nameError) {
                throw new Error('Validate fail')
            }

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
            } else if(response.status === 400) {
                handleAlert('error', `user not found`)
            }
        } catch (error) {
            handleAlert('error', error.message)
            console.log(error)
        }

    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email) && email !== '') {
            setValidateInput(prevState => ({
                ...prevState,
                emailError: true,
                emailMsg: 'Invalid email format (ex. example@mail.com)'
            }))
        } else {
            setValidateInput(prevState => ({
                ...prevState,
                emailError: false,
                emailMsg: ' '
            }))
        }
    }

    const validatePassword = (password) => {

        const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/;  // At least one lowercase and one uppercase letter
        const hasSpecialChar = /(?=.*[@$!%*?&_-])/;       // At least one special character
        const hasMinLength = /.{8,}/;                   // At least 8 characters long

        if (password !== '') {
            if (!hasMinLength.test(password)) {
                setValidateInput(prevState => ({
                    ...prevState,
                    passError: true,
                    passMsg: 'At least 8 characters long'
                }))
            } else if (!hasLowerUpper.test(password)) {
                setValidateInput(prevState => ({
                    ...prevState,
                    passError: true,
                    passMsg: 'At least one lowercase and one uppercase letter'
                }))
            } else if (!hasSpecialChar.test(password)) {
                setValidateInput(prevState => ({
                    ...prevState,
                    passError: true,
                    passMsg: 'At least one special character'
                }))
            } else {
                setValidateInput(prevState => ({
                    ...prevState,
                    passError: false,
                    passMsg: ' '
                }))
            }
        }
    }

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z0-9]+$/
        if (!nameRegex.test(name) && name !== '') {
            setValidateInput(prevState => ({
                ...prevState,
                nameError: true,
                nameMsg: 'using only letters (A-Z, a-z) and numbers (0-9). Spaces and special characters are not allowed.'
            }))
        } else {
            setValidateInput(prevState => ({
                ...prevState,
                nameError: false,
                nameMsg: ' '
            }))
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
                validateEmail(value)
                break
            case 'password':
                validatePassword(value)
                break
            default:
                validateName(value)
        }
    }

    useEffect(() => {
        // reset error validate when mode change
        setInputValue(prevState => ({
            ...prevState,
            email: '',
            password: '',
            name: ''
        }))
        setValidateInput(prevState => ({
            ...prevState,
            emailError: false,
            passError: false,
            nameError: false,
            emailMsg: ' ',
            passMsg: ' ',
            nameMsg: ' '
        }))
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