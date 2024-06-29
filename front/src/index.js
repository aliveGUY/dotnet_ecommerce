import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './state/store';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './pages/Navbar';
import Product from './pages/Product';
import ProductEdit from './pages/ProductEdit';
import ProductCreate from './pages/ProductCreate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/new" element={<ProductCreate />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/:id/edit" element={<ProductEdit />} />
      </Routes>
    </Router>
  </Provider>
);
