import CloseNavbarIcon from '@/public/icons/first_page.png'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import AvatarWrapper from './AvatarWrapper';
import ContractArea from './ContractArea';
import NavButttonList from './NavButtonLists';

export default function Navbar() {

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
        border: '1px solid rgb(224, 224, 224)',
        transition: 'all 300ms ease-in-out',
        zIndex: 8,
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
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
                    <NavButttonList handleNav={handleNav}></NavButttonList>
                </Stack>
                <ContractArea></ContractArea>
            </Stack>
        </NavbarBox>
    )
}


