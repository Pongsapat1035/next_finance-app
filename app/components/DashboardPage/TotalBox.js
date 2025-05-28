import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IncomeIcon from '@/public/icons/file_download.png'
import ExpendIcon from '@/public/icons/file_upload.png'


export default function TotalBox({ type = 'income', amout = 0 })  {
    return (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" columnGap={2} justifyContent="space-between">
                <Stack direction="column" rowGap={2}>
                    <Typography variant="h6" color="text.light" fontWeight="light">
                        Total.{type}
                    </Typography>
                    <Stack direction="row" gap={2}>
                        <Typography variant="h3" >
                            THB
                        </Typography>
                        <Typography variant="h3" color={type === 'income' ? 'success.main' : 'error.main'}>{amout.toLocaleString()}</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent="center" alignItems="center"
                    sx={{ p: 1, bgcolor: 'primary.main', borderRadius: '100%', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }}>
                    <Image src={type === 'income' ? IncomeIcon : ExpendIcon} alt={type + '-icon'}></Image>
                </Stack>
            </Stack>
        </Paper>
    )
}
