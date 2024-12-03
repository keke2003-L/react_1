import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import StockManagement from './components/StockManagement';
import UserManagement from './components/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthContext';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import './App.css';

function App() {
  // State for products and productImages
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || []);
  const [productImages, setProductImages] = useState(() => JSON.parse(localStorage.getItem('productImages')) || []);  // Added productImages state

  // Save products and productImages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productImages', JSON.stringify(productImages)); // Save productImages as well
  }, [products, productImages]);

  // Function to add or update a product
  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // Function to add an image for a new product
  const addProductImage = (imageUrl) => {
    setProductImages(prevImages => [...prevImages, imageUrl]);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          
          <Route
            path="/stock"
            element={
              <ProtectedRoute>
                <StockManagement 
                  products={products} 
                  setProducts={setProducts} 
                />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          
          {/* Pass products and productImages to Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard 
                  products={products} 
                  productImages={productImages} 
                />
              </ProtectedRoute>
            }
          />
          
          {/* Pass addProduct, setProducts, and addProductImage to ProductManagement */}
          <Route
            path="/product-management"
            element={
              <ProtectedRoute>
                <ProductManagement 
                  addProduct={addProduct} 
                  products={products} 
                  setProducts={setProducts} 
                  addProductImage={addProductImage}  // Pass addProductImage to handle adding images
                  productImages={productImages}     // Pass productImages as well
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
