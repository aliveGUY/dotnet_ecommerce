import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const menuItems = ['Categories', 'Brands', 'Sales', 'Trends']

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box display={{ md: 'none' }}>
            <MenuItem onClick={() => setMobileOpen(prev => !prev)}>
              {mobileOpen
                ? <CloseIcon />
                : <MenuIcon />
              }
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="h6" noWrap>
              <Link to="/">Vine Market</Link>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" display={{ sm: 'none', md: 'flex' }} mx={3} spacing={2}>
              {menuItems.map((item, index) => (
                <MenuItem key={index}>{item}</MenuItem>
              ))}
            </Stack>
          </Box>

          <Stack direction="row" sx={{ flexGrow: 0 }} spacing={2}>
            <Avatar />
            <Button variant="contained" href="/product/new">Add Product</Button>
          </Stack>
        </Toolbar>

        <Box display={{ md: 'none' }}>
          <Collapse in={mobileOpen}>
            {menuItems.map((item, index) => (
              <MenuItem key={index}>{item}</MenuItem>
            ))}
          </Collapse>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Navbar
