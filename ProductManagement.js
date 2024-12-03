import React, { useEffect, useState } from 'react';
import '../App.css';

const ProductManagement = ({ products, setProducts }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage('Error fetching products');
      console.error(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name: productName, description, price, quantity, image };

    try {
      if (editingProductId) {
        // Update existing product
        const response = await fetch(`http://localhost:5000/api/products/${editingProductId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        setMessage('Product updated successfully');
      } else {
        // Add new product
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        setMessage('Product added successfully');
      }

      resetForm();
      fetchProducts(); // Refresh product list
    } catch (error) {
      setMessage('Error adding/updating product');
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImage(product.image);
    setEditingProductId(product.id);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setMessage('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        setMessage('Error deleting product');
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setImage('');
    setEditingProductId(null);
  };

  return (
    <div className="form-container">
      <h2>{editingProductId ? 'Edit Product' : 'Product Management'}</h2>
      <form onSubmit={handleAddOrUpdateProduct}>
        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <label>Product Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>M{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                {product.image ? <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /> : 'No image'}
              </td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
