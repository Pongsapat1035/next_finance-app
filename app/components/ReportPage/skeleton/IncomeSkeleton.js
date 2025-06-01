import Grid2 from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function IncomeSkeleton() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12}> <Skeleton variant="rounded" width={100} height={30}></Skeleton></Grid2>
            <Grid2 size={12}>
                <Skeleton variant="rounded" height="10" width="100%"></Skeleton>
            </Grid2>
            {
                Array.from({ length: 4 }).map((_, idx) => (
                    <Grid2 container size={6} key={idx} direction="row">
                        <Skeleton variant="circular" width={40} height={40}></Skeleton>
                        <Stack direction="column">
                            <Skeleton variant="rounded" width={120} height={30}></Skeleton>
                        </Stack>
                    </Grid2>
                ))
            }
        </Grid2>
    )
}