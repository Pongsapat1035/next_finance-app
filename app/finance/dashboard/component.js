// "use client"
import { useState } from "react"
import {
    Grid2,
    Select,
    MenuItem,
    TextField,
    Button
} from "@mui/material"

import { addData } from "./actions"

export const InputBox = ({ type, selectLists, uid, month }) => {
    const [selectedValue, setSelectedValue] = useState('select type')
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const listData = {
            userid: uid,
            type: data.get('type'),
            amout: data.get('amout'),
            category: data.get('category')
        }
        console.log('data from user : ', listData)
        const response = await addData(listData, month)
        console.log(response)
        window.location.reload()
    }
    return (
        <Grid2 container spacing={2} direction={"column"}>
            <form onSubmit={submitForm}>
                <TextField id="outlined-basic" name="amout" type="number" label={type} variant="outlined" />
                <input type="hidden" name="type" value={type}></input>
                <Select
                    name="category"
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <MenuItem value="select type" disabled>select type</MenuItem>
                    {
                        selectLists.map((data, index) => <MenuItem key={index} value={data}>{data}</MenuItem>)
                    }

                </Select>
                <Button type="submit" variant="contained">Add</Button>
            </form>
        </Grid2>
    )
}