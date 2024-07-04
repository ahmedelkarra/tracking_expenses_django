import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    const time = new Date()
    return (
        <AppBar position="static" color="primary" sx={{ minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'end', justifySelf: 'end' }}>
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", gap: '10px', margin: '10px 0' }}>
                    <Typography component={'div'} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: '10px' }}>
                        <Typography component={'a'} href="#" color={'white'}>
                            <LinkedInIcon fontSize={'large'} />
                        </Typography>
                        <Typography component={'a'} href="#" color={'white'}>
                            <GitHubIcon fontSize={'large'} />
                        </Typography>
                    </Typography>
                    <Typography component={'p'} sx={{ textTransform: 'uppercase', textAlign: 'center', fontSize: '14px' }}>&copy; all rights reserved by Ahmed El karra {time.getFullYear()}</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer