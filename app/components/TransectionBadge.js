"use client"

import Box from '@mui/material/Box'

const TransectionBadge = ({ type = 'income' }) => {

    return (
        <Box sx={{ p: '3px', width: '80px', borderRadius: '20px', fontWeight: 'bold' }}
            bgcolor={type === 'income' ? 'success.light' : 'error.light'}
            color={type === 'income' ? 'success.dark' : 'error.dark'}>
            {type}
        </Box>
    )
}

export default TransectionBadge