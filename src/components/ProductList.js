import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../App';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Entradas</th>
          </tr>
        </thead>
        <tbody>
        {products.map(product => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.inventoryEntries ? product.inventoryEntries.length : 0}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;