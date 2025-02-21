"use client"
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';

export default function NavButttonList({ signOut,  handleNav }) {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>
                <ListMenu name="Dashboard" path='/finance/dashboard' handleNav={handleNav}></ListMenu>
                <ListMenu name="Report[unstable]" path='/finance/report' handleNav={handleNav}></ListMenu>
                <ListMenu name="Setting" path='/finance/setting' handleNav={handleNav}></ListMenu>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => signOut()} >
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

const ListMenu = ({ name, path, handleNav }) => {
    const router = useRouter()
    const handleClick = () => {
        router.push(path)
        handleNav()
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={() => handleClick()}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    )
}

