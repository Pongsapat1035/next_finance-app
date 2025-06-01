import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SummaryChartSkeleton() {
    return (
        <Stack direction="column" sx={{ height: 300 }} py={2}>
            <Stack direction="row" justifyContent="center" spacing={3}>
                <Skeleton variant="rounded" width={120} height={30} />
                <Skeleton variant="rounded" width={120} height={30} />
            </Stack>
            <Stack sx={{ flexGrow: 1 }}>
                <Skeleton width="100%" height={300} />
            </Stack>
        </Stack>
    )
}