"use client"

import { useRouter } from 'next/navigation'
import { userSignout } from "../auth/action"

import AvatarWrapper from '../components/navbar/AvatarWrapper'

export default function HomeLayout({ children }) {

    const handleSignout = async () => {
        try {
            //signout and redirect to home page
            const { status } = await userSignout()
            if (status) {
                console.log('user sign out')
            }
            alert('logout success !!')
            router.push('/')
        } catch (error) {
            console.log('signout error : ', error)
        }
    }

    return (
        <>
            <Navbar signOut={handleSignout}></Navbar>
            {children}
        </>
    )
}

import { styled } from '@mui/material/styles';
import { Stack, Typography, IconButton, Button, Grid2 } from '@mui/material'
import { Close, Translate } from '@mui/icons-material'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';

import CloseNavbarIcon from '@/app/components/icons/first_page.png'
import HambergerIcon from '@/app/components/icons/hamberger-menu.png'

const Navbar = ({ signOut }) => {

    const NavbarBox = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '300px',
        height: '95vh',
        borderRadius: '20px',
        padding: '1.5rem',
        overflow: 'hidden',
        transition: 'all 300ms ease-in-out',
        '&.close-nav': {
            width: '60px',
            height: '60px',
            padding: '10px',
            '.logo': {
                display: 'none'
            }
        }
    }));

    const handleNav = () => {
        const NavBar = document.getElementsByClassName('nav-bar')[0]
        const ButtonIcon = document.getElementsByClassName('logo-icon')[0]
        ButtonIcon.classList.toggle('rotate')
        NavBar.classList.toggle('close-nav')
    }

    return (
        <NavbarBox className='nav-bar close-nav'>
            <Stack height="100%" justifyContent="space-between">
                <Stack gap={2} >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant='h5' fontWeight="bold" className='logo'>
                            Finance
                        </Typography>
                        <IconButton onClick={() => handleNav()}>
                            <Image className='logo-icon' src={CloseNavbarIcon} alt="close-nav"></Image>
                        </IconButton>
                    </Stack>
                    <AvatarWrapper></AvatarWrapper>
                    <NavButttonList signOut={signOut}></NavButttonList>

                </Stack>
                <ContractArea></ContractArea>
            </Stack>
        </NavbarBox>
    )
}



const NavButttonList = ({ signOut }) => {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
                <ListMenu name="home"></ListMenu>
                <ListMenu name="Report"></ListMenu>
                <ListMenu name="Goal"></ListMenu>
                <ListMenu name="Chart"></ListMenu>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => signOut()} >
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    )
}

const ListMenu = ({ name, isclick }) => {
    return (
        <ListItem disablePadding >
            <ListItemButton>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    )
}

import Google_icon from '@/app/components/icons/gg_icon.png'
import Github_icon from '@/app/components/icons/github_icon.png'
import Linkedin_icon from '@/app/components/icons/linkedin_icon.png'
import Image from 'next/image'


const ContractArea = () => {

    return (
        <Box sx={{ borderRadius: '10px', bgcolor: 'background.base', padding: 2 }}>
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
