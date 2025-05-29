import Stack from '@mui/material/Stack'
import TransectionFrom from '@/app/components/DashboardPage/TransectionForm'

export default function Page() {
    return <Stack sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <TransectionFrom mode="create"></TransectionFrom>
    </Stack>
}