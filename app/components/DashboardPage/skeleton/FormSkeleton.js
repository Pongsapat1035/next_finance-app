import Grid2 from "@mui/material/Grid2"
import Skeleton from "@mui/material/Skeleton"

export default function FormSkeleton() {
    return (
        <Grid2 container spacing={3} p={5} justifyContent="end">
            <Grid2 size={12}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
            <Grid2 size={12}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
            <Grid2 size={6}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
            <Grid2 size={6}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
            <Grid2 size={12}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
            <Grid2 size={12}>
                <Skeleton variant="rounded" width="100%" height={60} />
            </Grid2>
        </Grid2>
    )
}