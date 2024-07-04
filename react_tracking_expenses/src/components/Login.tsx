import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useContext, useState } from "react"
import { IsUser } from "../context/IsUser";
import { useNavigate } from "react-router";


interface IValueInputs {
    username: string;
    password: string;
}


function Login() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ username: '', password: '' })
    const isUserContext = useContext(IsUser)
    const navigate = useNavigate();

    if (!isUserContext) {
        throw new Error('this field must be only boolean')
    }
    const { setIsUser } = isUserContext
    const [errorValue, setErrorValue] = useState<string>('')
    const [successValue, setSuccessValue] = useState<string>('')

    const hanndleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('/api/auth/login/', valueInputs)
            .then((e) => {
                setErrorValue('')
                setSuccessValue(e.data.message)
                setTimeout(() => {
                    setSuccessValue('')
                    setErrorValue('')
                    navigate('/')
                    setIsUser(true)
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
    }
    return (
        <form onSubmit={hanndleSubmit}>
            <Grid component={'div'} sx={{ border: '1px solid blue', width: { xs: '90%', md: '60%' }, height: { sm: '100%', md: '45dvh' }, margin: 'auto', borderRadius: '5px' }}>
                <Grid spacing={1} container padding={'20px'} height={'100%'} >
                    <Grid item xs={12} md={8} marginX={'auto'}>
                        <Typography component={'h3'} textAlign={'center'} marginY={2} border={'1px solid'} borderColor={'blue'} borderRadius={'5px'} padding={1}>Login Page</Typography>
                    </Grid>
                    <Grid item xs={10} marginX={'auto'}>
                        {errorValue && <Alert severity="error">{errorValue}</Alert>}
                        {successValue && <Alert severity="success">{successValue}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Username" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" variant="filled" color="info" type="password" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="info" fullWidth type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default Login