"use client"
import { useState } from "react"
import {
    Grid2,
    Select,
    MenuItem,
    TextField,
    Button
} from "@mui/material"

export const InputBox = ({ type, selectLists }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    return (
        <Grid2 container spacing={2} direction={"column"}>
            <TextField id="outlined-basic" label={type} variant="outlined" />
            <Select
                value={selectedValue}
                onChange={handleChange}
            >
                <MenuItem value="select type" disabled>select type</MenuItem>
                {
                    selectLists.map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                }

            </Select>
            <Button variant="contained">Add</Button>
        </Grid2>
    )
}