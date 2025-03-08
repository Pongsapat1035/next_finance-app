"use client"
import { useRouter } from "next/navigation";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function HomeNavbar() {
    const router = useRouter()
    return (
        <Grid2 container alignItems="center" justifyContent={"space-between"} paddingY={2}>
            <Box>
                <Typography variant='h4' fontWeight="bold">Finance</Typography>
            </Box>
            <Grid2 container spacing={2} sx={{ p: 2 }}>
                <Button variant='contained' onClick={() => router.push('/auth')} sx={{ px: 4 }}>Get started</Button>
            </Grid2>
        </Grid2>
    )
}

