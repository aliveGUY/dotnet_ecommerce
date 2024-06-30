import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { store } from './state/store'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import ProductEdit from './pages/ProductEdit'
import ProductCreate from './pages/ProductCreate'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { CssBaseline } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Navbar />
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/new" element={<ProductCreate />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/:id/edit" element={<ProductEdit />} />
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
)
