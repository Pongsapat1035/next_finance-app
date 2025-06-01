import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
export default function LoadingScreen() {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            sx={{ position: "fixed", top: 0, left: 0, zIndex: 10 }}
        >
            <Stack
                sx={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "#232323",
                    opacity: 0.3,
                    zIndex: 1,
                }}
            />
            <CircularProgress size="4rem" sx={{ zIndex: 2, color: "#FFFFFF" }} />
        </Stack>
    )
}