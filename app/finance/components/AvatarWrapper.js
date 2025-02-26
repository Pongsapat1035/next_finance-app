"use client"

import Image from 'next/image'
import ProfileIcon from '@/public/icons/person.png'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function AvatarWrapper() {
    return (
        <Stack alignItems="center" spacing={2} marginTop={2}>
            <Stack
                justifyContent="center"
                alignItems="center"
                width="100px"
                height="100px"
                margin="auto"
                sx={{ borderRadius: 100, bgcolor: '#EFEFEF', overflow: 'hidden' }}>
                <Image src={ProfileIcon} alt="profile"></Image>
            </Stack>
            <Typography variant='body1'>Username</Typography>
        </Stack>
    )
}

