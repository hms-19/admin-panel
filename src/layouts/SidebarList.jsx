import { Dashboard, HomeOutlined } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarList = ({open}) => {
  return (
    <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to={'/'}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </NavLink>
            <NavLink to={'/tournaments'}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    <HomeOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Tornements'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </NavLink>
        </ListItem>
    </List>
  )
}

export default SidebarList