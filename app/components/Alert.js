import Paper from '@mui/material/Paper'
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done"

export default function AlertBadge({ data = {}, handleFunction }) {
    const symbol = data.type === 'error' ? <Close sx={{ color: "#C72424" }}></Close> : <Done sx={{ color: "#5AAE25" }}></Done>
    const bgSymbol = data.type === 'error' ? "#FFF2F2" : "#E5F8D6"

    const symbolStyle = {
        borderRadius: '100%',
        bgcolor: bgSymbol,
        width: { xs: 40, sm: 50 },
        height: { xs: 40, sm: 50 }
    }

    const paperStyle = {
        width: 4/5,
        '@media (min-width: 600px)': {
            width: 1 / 3,
            bottom: 30,
            p: 3
        },
        '@media (min-width: 1024px)': {
            width: 1 / 4
        },
        borderRadius: 5,
        p: 2,
        position: "fixed",
        bottom: 80,
        right: 20,
        zIndex: 10,
        border: '1px solid rgb(224, 224, 224)'
    }

    return (
        <>
            <Paper elevation={0} sx={paperStyle}>
                <Grid2 container alignItems="center" gap={4} spacing={4}>
                    <Grid2 size={2}>
                        <Grid2 container justifyContent="center" alignItems="center" sx={symbolStyle}>
                            {symbol}
                        </Grid2>
                    </Grid2>
                    <Grid2 size={10}>
                        <Typography variant="h5" fontSize={{ xs: 18, sm: 24 }} fontWeight="bold">{data.type === 'error' ? 'Error' : 'Success'}</Typography>
                        <Typography variant="body1" color="text.light" fontSize={{ xs: 14, sm: 18 }}>{data.message}</Typography>
                    </Grid2>
                </Grid2>
                <IconButton onClick={handleFunction} size="small" sx={{ position: 'absolute', top: 10, right: 10 }} >
                    <Grid2 container justifyContent="center" alignItems="center">
                        <Close></Close>
                    </Grid2>
                </IconButton>
            </Paper>
        </>
    )
}