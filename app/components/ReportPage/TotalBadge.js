import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"

export default function TotalBadge({ type, value }) {
    return (
        <Stack spacing={1} sx={{ bgcolor: 'background.paper', p: 2, borderRadius: '15px' }}>
            <Typography variant="h6" color="text.light">Total. {type}</Typography>
            <Stack direction="row" gap={1}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={'text.primary'}>
                    THB
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={type === 'Income' ? 'success.main' : type === 'Expend' ? 'error.main' : 'text.primary'}>
                    {value.toLocaleString()}
                </Typography>
            </Stack>
        </Stack>
    )

}