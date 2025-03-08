"use client"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Image from 'next/image'

import Google_icon from '@/public/icons/gg_icon.png'
import Github_icon from '@/public/icons/github_icon.png'
import Linkedin_icon from '@/public/icons/linkedin_icon.png'

export default function ContractArea() {
   
    return (
        <Box sx={{ borderRadius: '10px', bgcolor: 'primary.light', padding: 2 }}>
            <Typography variant='h6' fontWeight="bold" sx={{ mb: 2 }}>Contract</Typography>
            <Stack direction="row" columnGap={2}>
                <a href="mailto:pongsapat357@gmail.com" target='blank'>
                    <Box width={30} height={30}>
                        <Image src={Google_icon} alt="google-icon"></Image>
                    </Box>
                </a>
                <a href="https://www.linkedin.com/in/pongsapat-chaleampong-59a630307/" target='blank'>
                    <Box width={30} height={30}>
                        <Image src={Linkedin_icon} alt="github-icon"></Image>
                    </Box>
                </a>
                <a href="https://github.com/Pongsapat1035" target='blank'>
                    <Box width={30} height={30}>
                        <Image src={Github_icon} alt="linkedin-icon"></Image>
                    </Box>
                </a>
            </Stack>
        </Box>
    )
}