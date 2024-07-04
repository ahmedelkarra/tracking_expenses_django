import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ first_name: '', last_name: '', username: '', email: '', password: '', confirmPassword: '' })
    const [errorValue, setErrorValue] = useState<string>('')
    const [successValue, setSuccessValue] = useState<string>('')
    const navigate = useNavigate();

    const handleDelete = () => {
        axios.post('/api/auth/register/', valueInputs)
            .then((e) => {
                setErrorValue('')
                setSuccessValue(e.data.message)
                setTimeout(() => {
                    setSuccessValue('')
                    setErrorValue('')
                    navigate('/login')
                }, 2000)
            })
            .catch((err) => {
                setSuccessValue('')
                setErrorValue(err.response.data.message)
                setTimeout(() => {
                    setSuccessValue('')
                    setErrorValue('')
                }, 3000)
            })
        console.log(valueInputs)
    }
    return (
        <Grid component={'div'} sx={{ border: '1px solid blue', width: { xs: '90%', md: '60%' }, height: { xs: '100%', md: '45dvh' }, margin: '10px auto', borderRadius: '5px' }}>
            <Grid spacing={1} container padding={'20px'} height={'100%'} >
                <Grid item xs={12} md={8} marginX={'auto'}>
                    <Typography component={'h3'} textAlign={'center'} marginY={2} border={'1px solid'} borderColor={'blue'} borderRadius={'5px'} padding={1}>Register Page</Typography>
                </Grid>
                <Grid item xs={10} marginX={'auto'}>
                    {errorValue && <Alert severity="error">{errorValue}</Alert>}
                    {successValue && <Alert severity="success">{successValue}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="First Name" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, first_name: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Last Name" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, last_name: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Username" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Email" variant="filled" color="info" type="email" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Password" variant="filled" color="info" type="password" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Confirm Password" variant="filled" color="info" type="password" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, confirmPassword: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant="contained" color="info" fullWidth onClick={handleDelete} type="button">Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Register