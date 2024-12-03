// ProductCarousel.js
import React, { useEffect, useState } from 'react';
import './ProductCarousel.css';
import R from './R.jpeg'; 
import OIP from './OIP.jpeg'; 
import lo from './lo.jpeg'; 
import menu from './menu.jpeg'; 
import nood from './nood.jpeg'; 
import oaks from './oaks.jpeg'; 
import chili from './chili.jpeg'; 



const ProductCarousel = () => {
  
  

  const products = [
    
    { image: R},
    { image: OIP},
    { image: lo},
    { image: menu},
    { image: nood},
    { image: oaks},
    { image: chili},

  ];

  // State to manage the current index of the displayed product
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically rotate images at a set interval (e.g., every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // Rotate every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [products.length]);

  // Handle clicks on the rotating image indicators
  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  // Get the current product based on the current index
  const currentProduct = products[currentIndex];

  return (
    <div className="carousel">
      {/* Display the main product image */}
      <img 
        src={currentProduct.image} // Use currentProduct.image here
        alt={currentProduct.name}   // Use currentProduct.name here
        className="carousel-image" 
      />
      <div className="carousel-info">
        <h3>{currentProduct.name}</h3>
      
        
        
      </div>

      {/* Rotating Image Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentIndex === index ? 1 : 0.4,
              transition: 'opacity 0.5s ease-in-out',
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(index)} // Click to navigate to the specific image
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
