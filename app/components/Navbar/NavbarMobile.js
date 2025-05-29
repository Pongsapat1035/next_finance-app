"use client"

import { useAuth } from '../../finance/authContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import Grid2 from "@mui/material/Grid2";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ConfirmModal from '@/app/components/ConfirmModal';

export default function NavbarMobile({ signOut }) {
    const { toggleCreateModal } = useAuth()
    const route = useRouter()
    const pathname = usePathname()
    const [activeLink, setActiveLink] = useState({
        dashboard: false,
        report: false,
        setting: false
    })
    const [confirmSignout, setConfirmSignout] = useState(false)

    const style = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        bgcolor: 'primary.main',
        width: '100%',
        py: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10
    }

    const navBtnStyle = { color: activeLink.dashboard ? 'background.paper' : 'text.light' }

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
        <Grid2 container direction="row" justifyContent="space-around"
            sx={style}>
            <IconButton aria-label="dashboard-page" onClick={() => route.push('/finance/dashboard')}>
                <SpaceDashboardRoundedIcon sx={navBtnStyle} />
            </IconButton>
            <IconButton aria-label="report-page" onClick={() => route.push('/finance/report')}>
                <AssessmentRoundedIcon sx={navBtnStyle} />
            </IconButton>
            <IconButton aria-label="new-transection" sx={{ bgcolor: 'primary.light', p: 1 }} disableRipple onClick={toggleCreateModal}>
                <AddRoundedIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            </IconButton>
            <IconButton aria-label="setting-page" onClick={() => route.push('/finance/setting')}>
                <SettingsRoundedIcon sx={navBtnStyle} />
            </IconButton>
            <IconButton aria-label="logout-page" onClick={() => setConfirmSignout(true)}>
                <LogoutRoundedIcon sx={{ color: 'text.light' }} />
            </IconButton>
            <ConfirmModal header="Sign out" state={confirmSignout} closeState={() => setConfirmSignout(false)} action={signOut}></ConfirmModal>
        </Grid2>
    )
}