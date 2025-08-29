import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import InventoryOperation from './components/InventoryOperation';
import ProductStatus from './components/ProductStatus';

const API_BASE_URL = 'https://localhost:7100/api';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Sistema de Inventario</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Productos</Link>
              <Link className="nav-link" to="/add-product">Agregar Producto</Link>
              <Link className="nav-link" to="/inventory-operations">Operaciones</Link>
              <Link className="nav-link" to="/product-status">Estado</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/inventory-operations" element={<InventoryOperation />} />
          <Route path="/product-status" element={<ProductStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
export { API_BASE_URL };