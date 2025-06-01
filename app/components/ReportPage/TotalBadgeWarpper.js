import Grid2 from "@mui/material/Grid2"
import TotalBadge from '@/app/components/ReportPage/TotalBadge';
import { useEffect, useState } from "react";
import { getTotalTransection } from "@/app/finance/dashboard/actions";


export default function TotalBadgeWarpper({ lists }) {
    const [dashboardData, setDashboardData] = useState({
        expend: 0,
        income: 0,
        balance: 0
    })

    const fetchTotalData = async () => {
        const response = await getTotalTransection(lists)
        setDashboardData(response)
    }

    useEffect(() => {
        fetchTotalData()
    }, [lists])

    return (
        <Grid2 size={{ xs: 12, md: 4 }} container direction="column" justifyContent="space-between" gap={{ xs: 2, md: 0 }}>
            <TotalBadge type="Income" value={dashboardData.income}></TotalBadge>
            <TotalBadge type="Expend" value={dashboardData.expend}></TotalBadge>
            <TotalBadge type="Balance" value={dashboardData.balance}></TotalBadge>
        </Grid2>

    )

}