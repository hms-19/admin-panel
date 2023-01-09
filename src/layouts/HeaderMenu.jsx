import React from 'react'
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, IconButton } from '@mui/material';

const HeaderMenu = ({handleProfileMenuOpen}) => {
  return (
    <Box>
        <IconButton
          size="large"
          aria-label="show 7 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          // onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
    </Box>
  )
}

export default HeaderMenu