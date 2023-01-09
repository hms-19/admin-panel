import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import '../components/Header/Header'
import { Search, SearchIconWrapper, StyledInputBase } from '../components/Header/Search';
import { Menu, MenuItem } from '@mui/material';
import HeaderMenu from './HeaderMenu';
import SidebarList from './SidebarList';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.common,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


export default function Layout() {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const APP_BAR_MOBILE = 64;
  const APP_BAR_DESKTOP = 82;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
  });

  const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP,
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  }));

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
  )

  return (
    <>
      <StyledRoot>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header position="fixed" open={open}>
            <Toolbar>
              {/* Icon Button */}
              {
                open ?
                <IconButton
                  color="inherit"
                  // aria-label="close drawer"
                  onClick={handleDrawerClose}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(!open && { display: 'none' }),
                  }}
                >
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                :
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              }
            

              {/* Logo */}
              <Typography variant="h6" style={{ 
                marginRight : '5px'
              }} noWrap component="div">
                Gamifly
              </Typography>

              {/* Search */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              {/* Menu Icon */}
              
              <Box sx={{ flexGrow: 1 }} />
              
              <HeaderMenu handleProfileMenuOpen={handleProfileMenuOpen} />
                
            </Toolbar>
          </Header>
          <Sidebar variant="permanent" open={open}>   
            <DrawerHeader></DrawerHeader>     
            <SidebarList open={open} />
          </Sidebar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />          
          </Box>
        </Box>
        <Main>
          <Outlet />
          {renderMenu}
        </Main>
      </StyledRoot>
    </>
  );
}