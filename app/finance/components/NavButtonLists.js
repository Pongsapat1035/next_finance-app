"use client"
import { useRouter, usePathname } from 'next/navigation'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useEffect, useState } from 'react';
import ConfirmModal from '@/app/components/ConfirmModal';


export default function NavButttonList({ signOut, handleNav }) {

    const [activeLink, setActiveLink] = useState({
        dashboard: false,
        report: false,
        setting: false
    })
    const pathname = usePathname()
    const [confirmSignout, setConfirmSignout] = useState(false)


    useEffect(() => {
        // check pathname and set active style
        switch (pathname) {
            case '/finance/dashboard':
                setActiveLink(prevState => ({
                    ...prevState,
                    dashboard: true,
                    report: false,
                    setting: false
                }))
                break
            case '/finance/report':
                setActiveLink(prevState => ({
                    ...prevState,
                    dashboard: false,
                    report: true,
                    setting: false
                }))
                break
            default:
                setActiveLink(prevState => ({
                    ...prevState,
                    dashboard: false,
                    report: false,
                    setting: true
                }))
        }
    }, [pathname])

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
                <ListMenu isActive={activeLink.dashboard} name="Dashboard" path='/finance/dashboard' handleNav={handleNav}></ListMenu>
                <ListMenu isActive={activeLink.report} name="Report" path='/finance/report' handleNav={handleNav}></ListMenu>
                <ListMenu isActive={activeLink.setting} name="Setting" path='/finance/setting' handleNav={handleNav}></ListMenu>
            </List>
            <Divider />
            <ListMenu isActive={activeLink.setting} name="Logout" handleNav={() => setConfirmSignout(true)}></ListMenu>
            <ConfirmModal header="Sign out" state={confirmSignout} closeState={() => setConfirmSignout(false)} action={signOut}></ConfirmModal>
        </Box>
    )
}

const ListMenu = ({ isActive, name, path = "", handleNav }) => {
    const router = useRouter()
    const [active, setActive] = useState(false)

    const handleClick = () => {
        router.push(path)
        handleNav()
    }

    useEffect(() => setActive(isActive ? true : false), [isActive])

    const textLinkStyle = {
        '.MuiTypography-root': {
            color: active ? 'text.main' : 'text.light',
            fontWeight: 'bold',
            transition: '.5s',
        },
    }

    const listBtnStyle = {
        '&:hover': {
            '.MuiTypography-root': {
                color: 'primary.main',
                fontWeight: 'bold',
            },
            '.MuiSvgIcon-root': {
                color: 'primary.main'
            }
        }
    }

    const iconStyle = {
        color: active ? 'primary.main' : 'primary.light',
        transition: '.5s',
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick()} sx={listBtnStyle} >
                <ListItemIcon>
                    {
                        path === '/finance/dashboard' ? <DashboardRoundedIcon sx={iconStyle} /> :
                            path === '/finance/report' ? <AssessmentRoundedIcon sx={iconStyle} /> :
                                path === '/finance/setting' ? <SettingsRoundedIcon sx={iconStyle} /> :
                                    <LogoutRoundedIcon sx={iconStyle} />
                    }
                </ListItemIcon>
                <ListItemText primary={name} sx={textLinkStyle} />
            </ListItemButton>
        </ListItem>
    )
}

