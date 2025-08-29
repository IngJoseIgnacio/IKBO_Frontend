import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../App';

const ProductStatus = () => {
  const [productsStatus, setProductsStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProductsStatus();
  }, []);

  const fetchProductsStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/status`);
      setProductsStatus(response.data);
    } catch (error) {
      console.error('Error fetching products status:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Vigente': return 'bg-success';
      case 'Por vencer': return 'bg-warning';
      case 'Vencido': return 'bg-danger';
      case 'Sin existencias': return 'bg-secondary';
      default: return 'bg-info';
    }
  };

  const filteredProducts = productsStatus.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Estado de Productos</h2>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Próxima caducidad</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.totalQuantity}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(product.status)}`}>
                  {product.status}
                </span>
              </td>
              <td>
                {product.nextExpiration 
                  ? new Date(product.nextExpiration).toLocaleDateString() 
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductStatus;