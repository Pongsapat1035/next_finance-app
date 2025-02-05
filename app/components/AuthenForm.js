"use client"
import { Grid2, Box, Button, Modal, Typography, TextField, Divider, Stack, Fab } from '@mui/material';
import { useState } from 'react';

import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { storeCredential } from '../action';

import { Close } from '@mui/icons-material';

export default function AuthenForm({ status, ModalHandle, formHandle, login }) {
    const [mode, SetMode] = useState(false)
    const [emailValid, setEmailValid] = useState({
        isValid: false,
        helperText: ''
    })
    const [passwordValid, setPasswordValid] = useState({
        isValid: false,
        helperText: ''
    })

    const handleEmail = (e) => {

        const value = e.target.value
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(value) === false && value !== '') {
            setEmailValid({
                ...emailValid,
                isValid: true,
                helperText: 'email is invalid format'
            })
        } else {
            setEmailValid({
                ...emailValid,
                isValid: false,
                helperText: ''
            })
        }

    }

    const handlePassword = (e) => {
        const value = e.target.value
        const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/;  // At least one lowercase and one uppercase letter
        const hasSpecialChar = /(?=.*[@$!%*?&_-])/;       // At least one special character
        const hasMinLength = /.{8,}/;                   // At least 8 characters long

        if (mode) {
            if (!hasMinLength.test(value) && value !== '') {
                setPasswordValid({
                    ...passwordValid,
                    isValid: true,
                    helperText: 'At least 8 characters long'
                })
            } else if (!hasLowerUpper.test(value) && value !== '') {
                setPasswordValid({
                    ...passwordValid,
                    isValid: true,
                    helperText: 'At least one lowercase and one uppercase letter'
                })
            } else if (!hasSpecialChar.test(value) && value !== '') {
                setPasswordValid({
                    ...passwordValid,
                    isValid: true,
                    helperText: 'At least one special character'
                })
            }
            else {
                setPasswordValid({
                    ...passwordValid,
                    isValid: false,
                    helperText: ''
                })
            }
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 5,
        borderRadius: 5,
        bgcolor: 'background.paper',
        p: 6,
        py: 8,
        position: 'relative'

    };

    return (
        <Modal
            open={status}
            onClose={ModalHandle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid2 container justifyContent="center" sx={style}>
                <form onSubmit={formHandle} style={{ width: '90%' }}>
                    <Grid2 container direction="column" spacing={2} alignItems="center"  >
                        <Typography variant='h3' sx={{ mb: '1rem' }}>{mode ? 'Sign up' : 'Sign in'}</Typography>
                        {mode ? <TextField label="Name" name="name" variant="outlined" fullWidth required sx={{ bgcolor: 'white' }}></TextField> : ''}

                        <TextField name='email' label="E-mail" type='email'
                            error={emailValid.isValid} helperText={emailValid.helperText}
                            variant="outlined" required onChange={handleEmail} fullWidth
                            sx={{ bgcolor: 'white', height: '80px' }}></TextField>
                        <input type="hidden" name="mode" value={mode} />
                        <TextField label="Password" type="password" variant="outlined" onChange={handlePassword}
                            error={passwordValid.isValid} required helperText={passwordValid.helperText} fullWidth
                            sx={{ bgcolor: 'white', height: '80px' }}></TextField>
                        <Stack spacing={2} width="100%" marginTop={4}>
                            <Button type='submit' variant="contained" fullWidth >{mode ? 'Register' : 'Login'}</Button>
                            <Button variant="contained" fullWidth onClick={() => SetMode(!mode)}>{mode ? 'Return to login' : 'Create new account'}</Button>
                        </Stack>
                        <Divider>or</Divider>
                        <Button variant="contained" fullWidth onClick={() => login()}>Login with google</Button>

                    </Grid2>
                </form>
                <Button size="small" color="transparent" sx={{ borderRadius: '100%', p: 2, position: 'absolute', top: 10, right: 5 }}><Close></Close></Button>
            </Grid2>
        </Modal>
    )
}