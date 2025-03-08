import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import { useRouter } from 'next/navigation';

export default function SpeedDialNav({ signOut }) {
    const router = useRouter()
    const actions = [
        { icon: <DashboardRoundedIcon />, name: 'Dashboard', route: () => router.push('/finance/dashboard') },
        { icon: <AssessmentRoundedIcon />, name: 'Report', route: () => router.push('/finance/report') },
        { icon: <SettingsRoundedIcon />, name: 'Setting', route: () => router.push('/finance/setting') },
        { icon: <OutputOutlinedIcon />, name: 'Logout', route: () => signOut() },
    ];

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 5, right: 5 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.route}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}