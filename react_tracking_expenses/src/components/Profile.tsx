import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserInfo } from "../context/UserInfo";
import { useNavigate } from "react-router";
import axios from "axios";
import { Cookies } from "react-cookie";
import { IsChange } from "../context/IsChange";


interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    newPassword: string;
}


function Profile() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ first_name: '', last_name: '', username: '', email: '', password: '', newPassword: '' })
    const [errorValue, setErrorValue] = useState<string>('')
    const [successValue, setSuccessValue] = useState<string>('')
    const navigate = useNavigate();
    const cookie = new Cookies()
    const userInfoContext = useContext(UserInfo)
    const isChangeContext = useContext(IsChange)
    if (!isChangeContext) {
        throw new Error('this must be boolean')
    }

    if (!userInfoContext) {
        throw new Error('this must be as IValueInputs')
    }
    const { userInfo } = userInfoContext
    const { setIsChange } = isChangeContext

    const handleSubmit = () => {
        axios.put('/api/auth/me', valueInputs, { headers: { 'X-CSRFToken': cookie.get('csrftoken') } })
            .then((e) => {
                setErrorValue('')
                setSuccessValue(e.data.message)
                setIsChange(true)
                setTimeout(() => {
                    setSuccessValue('')
                    setErrorValue('')
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

    const handleDelete = () => {
        axios.delete('/api/auth/me', { headers: { 'X-CSRFToken': cookie.get('csrftoken') }, data: valueInputs })
            .then((e) => {
                setErrorValue('')
                setSuccessValue(e.data.message)
                setTimeout(() => {
                    setSuccessValue('')
                    setErrorValue('')
                    navigate('/')
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

    useEffect(() => {
        setValueInputs({ ...valueInputs, first_name: userInfo.first_name, last_name: userInfo.last_name, username: userInfo.username, email: userInfo.email })
    }, [userInfo])
    console.log(userInfo)
    return (
        <Grid component={'div'} sx={{ border: '1px solid blue', width: { xs: '90%', md: '60%' }, height: { xs: '100%', md: '45dvh' }, margin: '10px auto', borderRadius: '5px' }}>
            <Grid spacing={1} container padding={'20px'} height={'100%'} >
                <Grid item xs={12} md={8} marginX={'auto'}>
                    <Typography component={'h3'} textAlign={'center'} marginY={2} border={'1px solid'} borderColor={'blue'} borderRadius={'5px'} padding={1}>Profile Page</Typography>
                </Grid>
                <Grid item xs={10} marginX={'auto'}>
                    {errorValue && <Alert severity="error">{errorValue}</Alert>}
                    {successValue && <Alert severity="success">{successValue}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="First Name" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, first_name: e.target.value })} value={valueInputs.first_name} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Last Name" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, last_name: e.target.value })} value={valueInputs.last_name} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Username" variant="filled" color="info" type="text" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} value={valueInputs.username} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Email" variant="filled" color="info" type="email" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} value={valueInputs.email} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Password" variant="filled" color="info" type="password" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="New Password" variant="filled" color="info" type="password" placeholder="" required fullWidth onChange={(e) => setValueInputs({ ...valueInputs, newPassword: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="info" fullWidth onClick={handleSubmit} type="button">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="error" fullWidth onClick={handleDelete} type="button">Delete</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile