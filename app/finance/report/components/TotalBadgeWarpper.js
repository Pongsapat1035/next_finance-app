import { Grid2 } from "@mui/material";
import TotalBadge from "./TotalBadge";

export default function TotalBadgeWarpper() {
    return (
        <Grid2 size={4} container direction="column" justifyContent="space-between">
            <TotalBadge type="Income" value={556}></TotalBadge>
            <TotalBadge type="Expend" value={250}></TotalBadge>
            <TotalBadge type="Balance" value={450}></TotalBadge>
        </Grid2>

    )

}