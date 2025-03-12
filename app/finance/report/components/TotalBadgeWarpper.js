import { Grid2 } from "@mui/material";
import TotalBadge from "./TotalBadge";
import { useEffect, useState } from "react";

export default function TotalBadgeWarpper({ lists }) {
    const [dashboardData, setDashboardData] = useState({
        expend: 0,
        income: 0,
        balance: 0
    })
    useEffect(() => {
        if (lists.length > 0) {
            // if have data calculate total
            const expendSum = lists.filter((list) => list.data.type === 'expend').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
            const incomeSum = lists.filter((list) => list.data.type === 'income').reduce((acc, currectVal) => acc + currectVal.data.amout, 0,)
            const balance = incomeSum - expendSum

            setDashboardData({
                income: incomeSum,
                expend: expendSum,
                balance: balance
            })
        }
    }, [lists])

    return (
        <Grid2 size={4} container direction="column" justifyContent="space-between">
            <TotalBadge type="Income" value={dashboardData.income}></TotalBadge>
            <TotalBadge type="Expend" value={dashboardData.expend}></TotalBadge>
            <TotalBadge type="Balance" value={dashboardData.balance}></TotalBadge>
        </Grid2>

    )

}