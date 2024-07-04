import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { IsUser } from '../context/IsUser';
import { IsChange } from '../context/IsChange';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import logo from '../../public/logo.png'

const pages = [{ title: 'Home', url: '/' }, { title: 'Login', url: '/login' }, { title: 'Register', url: '/register' },];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const cookie = new Cookies()
  const navigate = useNavigate();
  const isUserContext = React.useContext(IsUser)
  const isChangeContext = React.useContext(IsChange)
  if (!isChangeContext) {
    throw new Error('this must be boolean')
  }

  if (!isUserContext) {
    throw new Error('this field must be only boolean')
  }
  const { isUser } = isUserContext
  const { setIsChange } = isChangeContext

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setIsChange(true)
  };

  const handleLogout = () => {
    handleCloseUserMenu()
    axios.get('/api/auth/me/logout', { headers: { 'X-CSRFToken': cookie.get('csrftoken') } })
      .then((e) => {
        console.log(e.data.message)
        setIsChange(true)
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <AppBar position="static" color='info'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography component={'img'} alt='logo' src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '50px', height: '50px' }} draggable={false} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isUser ?
                <Link to={'/'} style={{ textDecoration: 'none', color: 'gray' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    Home
                  </MenuItem>
                </Link>
                :
                pages.map((page, index) => (
                  <Link to={page.url} key={index} style={{ textDecoration: 'none', color: 'gray' }}>
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      {page.title}
                    </MenuItem>
                  </Link>
                ))
              }
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography component={'img'} alt='logo' src={logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: '50px', height: '50px' }} draggable={false} />
          </Typography>
          {!isUser ?
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Link to={page.url} key={index} style={{ textDecoration: 'none' }}>
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
            :
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
              </Link>
            </Box>
          }
          {isUser && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ textTransform: 'capitalize' }} alt="Aemy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to={'/profile'} style={{ textDecoration: 'none', color: 'gray' }}>
                <MenuItem onClick={handleCloseUserMenu}>
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout} style={{ color: 'gray' }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
