import Box from "@mui/material/Box"
import Grid2 from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export default function DashboardSkeleton() {
    const boxStyle = { border: 1, border: 0, backgroundColor: "background.paper", borderRadius: "20px", p: 4 }

    return (
        <Box height="100vh" py={2}>
            <Grid2 container direction="row" spacing={4} sx={{ width: '100%' }}>
                <Grid2 size={{ xs: 12, sm: 7, lg: 8 }}>
                    <Stack spacing={4} sx={{ height: '100%' }}>
                        <Grid2 container direction="row" spacing={2}>
                            <Grid2 size="auto" container sx={boxStyle} justifyContent="space-between">
                                <Grid2 container direction="column" size={7}>
                                    <Skeleton width={200} height={50} variant='rounded'></Skeleton>
                                    <Skeleton width={200} height={30} variant='rounded'></Skeleton>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Skeleton variant="circular" width={80} height={80} />
                                </Grid2>
                            </Grid2>
                            <Grid2 size={{ xs: 'auto', sm:6 }} container justifyContent="space-between" sx={boxStyle}>
                                <Grid2 container direction="column" size={7}>
                                    <Skeleton width={200} height={50} variant='rounded'></Skeleton>
                                    <Skeleton width={200} height={30} variant='rounded'></Skeleton>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Skeleton variant="circular" width={80} height={80} />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={4} direction="column" sx={boxStyle}>
                            <Grid2 size={12}>
                                <Skeleton width="40%" height={60} variant='rounded'></Skeleton>
                            </Grid2>
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Grid2 key={index} size={12}>
                                        <Skeleton width="100%" height={60} variant='rounded'></Skeleton>
                                    </Grid2>
                                ))
                            }
                        </Grid2>
                    </Stack>
                </Grid2>
                <Grid2 size={{ sm: 5, lg: 4 }} container direction="column" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Grid2 size={12} container direction="column" sx={boxStyle}>
                        <Skeleton variant="circular" width={60} height={60} />
                        <Skeleton variant="rounded" width="100%" height={30} />
                        <Skeleton variant="rounded" width="100%" height={30} />
                        <Skeleton variant="rounded" width="40%" height={60} />
                    </Grid2>
                    <Grid2 size={12} container direction="column" sx={boxStyle}>
                        <Skeleton variant="circular" width={60} height={60} />
                        <Skeleton variant="rounded" width="50%" height={50} />
                        <Skeleton variant="rounded" width="100%" height={20} />
                    </Grid2>
                    <Grid2 size={12} container direction="column" sx={boxStyle}>

                        <Skeleton variant="rounded" width="50%" height={40} />
                        <Skeleton variant="rounded" width="100%" height={120} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    )
}