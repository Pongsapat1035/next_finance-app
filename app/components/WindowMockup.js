"use client"
//  Not use 

import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function WindowMockUp({ children }) {
    const containerStyle = { width: '100%', height: 'auto', bgcolor: 'background.main', borderRadius: 5 }
    const searchBoxStyle = { width: 1 / 3, borderRadius: 3, bgcolor: 'background.base', px: 3, py: 1.3 }

    return (
        <Grid2 container direction="column" sx={containerStyle}>
            <Grid2 container size={1} direction="row" width="100%" p={5} pb={2} alignItems="center">
                {/* Nav */}
                <Grid2 container direction="row" gap={1} height={30} alignItems="center">
                    <Box sx={{ width: 20, height: 20, borderRadius: 100, bgcolor: '#FB4141' }}></Box>
                    <Box sx={{ width: 20, height: 20, borderRadius: 100, bgcolor: '#FFC145' }}></Box>
                    <Box sx={{ width: 20, height: 20, borderRadius: 100, bgcolor: '#9ADE7B' }}></Box>
                </Grid2>
                <Grid2 container size="grow" alignItems="center" justifyContent="center">
                    <Stack direction="row" gap={2}
                        sx={searchBoxStyle}>
                        <Box>
                            <SearchRoundedIcon ></SearchRoundedIcon>
                        </Box>
                        <Box>
                            <Typography variant='body1' fontWeight="bold" color='primary.main'>https://Finance.app</Typography>
                        </Box>
                    </Stack>
                </Grid2>
            </Grid2>
            <Grid2 container size={11} p={4} alignItems="center" justifyContent="center" width="100%">
                <Box borderRadius={5} width="100%">
                    {children}
                </Box>

            </Grid2>
        </Grid2>
    )
}