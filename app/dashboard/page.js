import { InputBox } from "../components/dashboard";
import {
  Grid2,
  Paper,
  Box,
  Typography
} from "@mui/material";

import Link from "next/link";

export default function Dashboard() {
  const inputListData = [
    {
      type: 'income',
      selectLists: ['salary', 'special']
    }, {
      type: 'expend',
      selectLists: ['food', 'entertainmen']
    }
  ]
  return (
    <>
      <Link href="/">Home</Link>
      <Grid2 container spacing={6}>
        <Grid2 size={12}>
          <DashboardContainer></DashboardContainer>
        </Grid2>
        <Grid2 size="grow">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>item 1</Paper>
        </Grid2>
        <Grid2 size="auto">
          <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
            <Grid2 container spacing={2} direction="column">
              {
                inputListData.map((data, index) => <InputBox key={index} type={data.type} selectLists={data.selectLists}></InputBox>)
              }
            </Grid2>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
}

const DashboardContainer = () => {
  return (
    <Paper elevation={2} variant="outlined" sx={{ padding: 4 }}>
      <Grid2 container spacing={2}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Income</Typography>
          <Typography variant="h2">$2000</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Expend</Typography>
          <Typography variant="h2">$2000</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Summary</Typography>
          <Typography variant="h2">+$200</Typography>
        </Box>
      </Grid2>
    </Paper>
  )
}

