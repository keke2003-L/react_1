import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, BarController } from 'chart.js';
import 'chartjs-plugin-datalabels'; 
import ProductCarousel from './ProductCarousel'; 
import '../App.css';
import ProductManagement from './ProductManagement'; 
import StockManagement from './StockManagement'; 


Chart.register(CategoryScale, LinearScale, BarElement, BarController);

const Dashboard = ({ products = [] }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (products.length === 0) return;

    
    const chartData = {
      labels: products.map((product) => product.name), 
      datasets: [
        {
          label: 'Current Stock Levels',
          data: products.map(product => product.quantity), 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    
    const ctx = document.getElementById('myChart').getContext('2d');

    
    if (chartInstance) {
      chartInstance.destroy();
    }

    
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: 'black',
            font: {
              weight: 'bold',
              size: 14,
            },
            padding: 5,
            formatter: (value) => value, 
          },
        },
      },
    });

    
    setChartInstance(newChartInstance);

    
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [products]);

  return (
    <div className="form-container">
      <h2 className="dashboard-header">Wings Cafe Inventory</h2>
      <div className="dashboard-content">
        <p>Welcome to the Wings Cafe Inventory Management System!</p>
        <p>PRODUCTS AVAILABLE IN STOCK</p>
        
      
        <ProductCarousel products={products} />
        
        
        <div className="dashboard-graph" style={{ width: '100%', height: '300px' }}>
          <h3>Current Stock Levels</h3>
          <canvas id="myChart"></canvas>
        </div>
        <br/>

        
        <div className="dashboard-links">
          <Link to="/stock" className="dashboard-link">Manage Stock</Link><br/>
          <Link to="/users" className="dashboard-link">Manage Users</Link>
          <Link to="/product-management" className="dashboard-link">Manage Products</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
