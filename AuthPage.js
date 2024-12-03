import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../App.css';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
      login(username);
      setMessage('Logged in successfully!');
      setTimeout(() => navigate('/dashboard'), 1500); // Redirect to the dashboard after login
    } else {
      setMessage('Invalid username or password.');
    }
  };
  

  const handleSignUp = (e) => {
    e.preventDefault();
    const userExists = users.some(user => user.username === username);
    if (!userExists) {
      const newUser = { username, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setMessage('Sign-up successful! Please log in.');
      setTimeout(() => {
        setIsSignUp(false); // Switch to login mode
      }, 1500); // Optional delay before switching to login mode
    } else {
      setMessage('Username already exists.');
    }
  };
  

  return (
    <div className="form-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isSignUp
          ? 'Already have an account? '
          : 'Don\'t have an account? '}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </span>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthPage;
