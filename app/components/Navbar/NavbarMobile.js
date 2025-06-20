"use client"
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useConfirm } from '@/app/confirmContext';
import { userSignout } from '@/app/auth/action';

import IconButton from '@mui/material/IconButton';
import Grid2 from "@mui/material/Grid2";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function NavbarMobile() {
    const router = useRouter()
    const pathname = usePathname()
    const { handleConfirm } = useConfirm()
    const [activeLink, setActiveLink] = useState({
        dashboard: false,
        report: false,
        setting: false
    })

    const handleSignout = () => handleConfirm("Signout", "Are sure to sign out ?", async () => await userSignout())

    const style = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'primary.main',
        width: '100%',
        minWidth: 0,
         overflowX: 'auto',
        py: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10,
        display: 'none',
        '@media (max-width: 899.95px)': {
            display: 'flex'
        },
    }

    useEffect(() => {
        // check pathname and set active style
        if (pathname.includes("dashboard")) {
            setActiveLink(prevState => ({
                ...prevState,
                dashboard: true,
                report: false,
                setting: false
            }))
        } else if (pathname.includes("report")) {
            setActiveLink(prevState => ({
                ...prevState,
                dashboard: false,
                report: true,
                setting: false
            }))
        } else {
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
            <IconButton aria-label="dashboard-page" onClick={() => router.push('/finance/dashboard')}>
                <SpaceDashboardRoundedIcon sx={{ color: activeLink.dashboard ? 'background.paper' : 'text.light' }} />
            </IconButton>
            <IconButton aria-label="report-page" onClick={() => router.push('/finance/report')}>
                <AssessmentRoundedIcon sx={{ color: activeLink.report ? 'background.paper' : 'text.light' }} />
            </IconButton>
            <IconButton aria-label="new-transection" sx={{ bgcolor: 'primary.light', p: 1 }} disableRipple onClick={() => router.push('/finance/dashboard/create')}>
                <AddRoundedIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            </IconButton>
            <IconButton aria-label="setting-page" onClick={() => router.push('/finance/setting')}>
                <SettingsRoundedIcon sx={{ color: activeLink.setting ? 'background.paper' : 'text.light' }} />
            </IconButton>
            <IconButton aria-label="logout-page" onClick={handleSignout}>
                <LogoutRoundedIcon sx={{ color: 'text.light' }} />
            </IconButton>
        </Grid2>
    )
}