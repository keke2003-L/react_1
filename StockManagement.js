import React, { useState } from 'react';
import '../App.css';

const StockManagement = ({ products, setProducts }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellQuantity, setSellQuantity] = useState(''); 
  const [message, setMessage] = useState('');

  const handleAddOrUpdateStock = (e) => {
    e.preventDefault();
    
    const productIndex = products.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());

    if (productIndex !== -1) {
      
      const updatedProducts = [...products];
      updatedProducts[productIndex].quantity = (updatedProducts[productIndex].quantity || 0) + parseInt(quantity);
      setProducts(updatedProducts);
      setMessage(`Stock updated successfully for ${productName}. New quantity: ${updatedProducts[productIndex].quantity}`);
    } else {
      setMessage(`Product "${productName}" not found.`);
    }

    // Clear form
    setProductName('');
    setQuantity('');
  };

  const handleSellProduct = (e) => {
    e.preventDefault();
    
    const productIndex = products.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());

    if (productIndex !== -1) {
      const updatedProducts = [...products];
      const availableQuantity = updatedProducts[productIndex].quantity || 0;
      const sellAmount = parseInt(sellQuantity);

      if (sellAmount <= availableQuantity) {
        // Decrease quantity by the sold amount
        updatedProducts[productIndex].quantity -= sellAmount;
        setProducts(updatedProducts);
        setMessage(`${sellQuantity} units of ${productName} sold successfully. New quantity: ${updatedProducts[productIndex].quantity}`);
      } else {
        setMessage(`Not enough stock available to sell ${sellQuantity} units.`);
      }
    } else {
      setMessage(`Product "${productName}" not found.`);
    }

    // Clear form
    setProductName('');
    setSellQuantity('');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product from stock?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setMessage('Product deleted successfully from stock.');
    }
  };

  const handleEditStock = (product) => {
    setProductName(product.name);
    setQuantity(product.quantity || 0);
  };

  return (
    <div className="form-container">
      <h2>Stock Management</h2>
      
      {/* Add or Update Stock Form */}
      <form onSubmit={handleAddOrUpdateStock}>
        <label>Product Name</label>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />
        <label>Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
        <button type="submit">Update Stock</button>
      </form>

  
      <form onSubmit={handleSellProduct}>
        <label>Sell Product Name</label>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />
        <label>Quantity to Sell</label>
        <input 
          type="number" 
          value={sellQuantity} 
          onChange={(e) => setSellQuantity(e.target.value)} 
          required 
        />
        <button type="submit">Sell Product</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Products in Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity || 0}</td>
                <td>
                  <button onClick={() => handleEditStock(item)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
