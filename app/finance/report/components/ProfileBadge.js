import Image from "next/image"
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import ProfileIcon from '@/public/icons/person.png'

export default function ProfileBadge() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1" color="text.light">Username</Typography>
            <Stack
                justifyContent="center"
                alignItems="center"
                width="50px"
                height="50px"
                margin="auto"
                sx={{ borderRadius: 100, bgcolor: 'primary.light', overflow: 'hidden' }}>
                <Image src={ProfileIcon} alt="profile" width="40" height="40"></Image>
            </Stack>
        </Stack>

    )
}