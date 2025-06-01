import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

export default function PieChartSkeleton() {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-around">
            <Skeleton variant="circular" width={200} height={200}></Skeleton>
            <Stack direction="column" spacing={3}>
                <Skeleton variant="rounded" width={200} height={15}></Skeleton>
                <Skeleton variant="rounded" width={200} height={15}></Skeleton>
                <Skeleton variant="rounded" width={200} height={15}></Skeleton>
            </Stack>
        </Stack>
    )
}