import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../App';

const InventoryOperation = () => {
  const [products, setProducts] = useState([]);
  const [operationType, setOperationType] = useState('input');
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    expirationDate: ''
  });
  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = operationType === 'input' ? 'input' : 'output';
      const payload = {
        ...formData,
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
        expirationDate: operationType === 'input' ? formData.expirationDate : new Date().toISOString()
      };

      await axios.post(`${API_BASE_URL}/inventory/${endpoint}`, payload);
      setMessage(`Operación de ${operationType === 'input' ? 'entrada' : 'salida'} realizada exitosamente`);
      setFormData({
        productId: '',
        quantity: '',
        expirationDate: ''
      });
    } catch (error) {
      setMessage(`Error en la operación: ${error.response?.data || error.message}`);
      console.error('Error performing operation:', error);
    }
  };

  return (
    <div>
      <h2>Operaciones de Inventario</h2>
      {message && <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
      
      <div className="mb-3">
        <label className="form-label">Tipo de operación</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="operationType"
              id="inputRadio"
              value="input"
              checked={operationType === 'input'}
              onChange={() => setOperationType('input')}
            />
            <label className="form-check-label" htmlFor="inputRadio">Entrada</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="operationType"
              id="outputRadio"
              value="output"
              checked={operationType === 'output'}
              onChange={() => setOperationType('output')}
            />
            <label className="form-check-label" htmlFor="outputRadio">Salida</label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Producto</label>
          <select
            className="form-select"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        {operationType === 'input' && (
          <div className="mb-3">
            <label htmlFor="expirationDate" className="form-label">Fecha de caducidad</label>
            <input
              type="date"
              className="form-control"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {operationType === 'input' ? 'Registrar Entrada' : 'Registrar Salida'}
        </button>
      </form>
    </div>
  );
};

export default InventoryOperation;