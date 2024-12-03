import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../App.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        {!isAuthenticated ? (
          <li><Link to="/auth">Sign Up / Login</Link></li>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/users">User Management</Link></li>
            <li><Link to="/stock">Stock Management</Link></li>
            <li><Link to="/product-management">Product Management</Link></li> {/* New link for Product Management */}
            <li><button className="logout-btn" onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;