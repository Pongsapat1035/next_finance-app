"use client"

import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ProfileIcon from '../icons/person.png'

const AvatarWrapper = () => {
    return (
        <Stack alignItems="center" spacing={2} marginTop={2}>
            <Stack
                justifyContent="center"
                alignItems="center"
                width="100px"
                height="100px"
                margin="auto"
                sx={{ borderRadius: 100, bgcolor: '#EFEFEF', overflow: 'hidden' }}>
                <Image src={ProfileIcon} borderRadius="100%" alt="profile"></Image>
            </Stack>
            <Typography variant='body1'>Username</Typography>
        </Stack>
    )
}

export default AvatarWrapper