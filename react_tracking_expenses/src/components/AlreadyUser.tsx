import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router";

function AlreadyUser() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000);
    }, [])
    return (
        <Typography component={'div'} sx={{ display: 'flex', border: '1px solid blue', width: { xs: '90%', md: '60%' }, height: { xs: '60dvh', md: '45dvh' }, margin: 'auto', borderRadius: '5px', justifyContent: 'center', alignItems: 'center' }}>
            <Typography component={"h3"} variant="h5" color={'blue'} border={'1px solid'} borderRadius={'5px'} padding={2} textAlign={'center'} sx={{ width: { xs: '90%', md: '60%' } }}>
                you have already sign in
            </Typography>
        </Typography>
    )
}

export default AlreadyUser