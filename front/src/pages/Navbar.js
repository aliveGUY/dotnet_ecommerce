import { Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Stack direction="row" gap={3}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product/new">Add Product</Link>
      </Stack>
    </nav>
  )
}

export default Navbar
