import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { alpha, styled } from '@mui/material/styles';

function InputBox({ label, nameTag, typeTag, placeHolder, errorMsg }) {
    const InputTag = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            width: '100%',
            borderRadius: 8,
            position: 'relative',
            backgroundColor: '#F3F6F9',
            border: '1px solid',
            borderColor: '#E0E3E7',
            fontSize: 16,

            padding: '10px 15px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            fontFamily: [
                'Inria sans',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            },
            ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
                borderColor: '#2D3843',
            }),
        },
    }));

    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel shrink>
                {label}
            </InputLabel>
            <InputTag name={nameTag} type={typeTag} placeholder={placeHolder}></InputTag>
            <FormHelperText>{errorMsg}</FormHelperText>
        </FormControl>
    )
}

export default InputBox;