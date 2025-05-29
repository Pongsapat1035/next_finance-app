"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';

import { getTransection } from '../actions';
import TransectionFrom from '@/app/components/DashboardPage/TransectionForm';
import Stack from '@mui/material/Stack';

export default function Page({ params }) {
    const { user } = useAuth()
    const [formData, setFormData] = useState()
    const query = useSearchParams();
    const month = query.get("month")

    const getParams = async () => {
        const { id } = await params

        if (id && user) {
            const response = await getTransection(user.uuid, month, id)
            const convertResponse = JSON.parse(response)
            convertResponse.id = id
            setFormData(convertResponse)
        }
    }

    useEffect(() => {
        getParams()
    }, [user])

    return (
        <Stack sx={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TransectionFrom data={formData} mode="edit"></TransectionFrom>
        </Stack>
    )
}