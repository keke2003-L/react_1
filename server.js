const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  


const app = express();
const port = 5000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '58493951', 
  database: 'wings', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return process.exit(1); 
  }
  console.log('Connected to the MySQL database.');
});


app.use(cors());
app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('No products found.');
    }
    res.json(results);
  });
});


app.post('/api/products', (req, res) => {
  const { name, description, price, quantity, image } = req.body;

  
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'INSERT INTO products (name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, description, price, quantity, image], (err, result) => {
    if (err) {
      console.error('Error adding product:', err.message);
      return res.status(500).json({ error: err.message }); 
    }
    res.status(201).json({
      message: 'Product added successfully',
      productId: result.insertId,
    });
  });
});


app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, image } = req.body;

  
  if (!name || !description || !price || !quantity || !image) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image = ? WHERE id = ?';
  db.query(sql, [name, description, price, quantity, image, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err.message);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Product not found');
    }
    res.json({ message: 'Product updated successfully' });
  });
});


app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err.message);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Product not found');
    }
    res.json({ message: 'Product deleted successfully' });
  });
});


app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('No users found.');
    }
    res.json(results);
  });
});


app.post('/api/users', async (req, res) => {
  const { username, password, email, role_id } = req.body;

  
  if (!username || !password || !email || !role_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO user (username, password_hash, email, role_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, hashedPassword, email, role_id], (err, result) => {
    if (err) {
      console.error('Error adding user:', err.message);
      return res.status(500).json({ error: err.message }); // Return a meaningful error message
    }
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  });
});

// Update an existing user (PUT)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  // Check if all required fields are provided
  if (!username || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const sql = 'UPDATE user SET username = ?, password_hash = ?, email = ?, role_id = ? WHERE id = ?';
  db.query(sql, [username, role], (err, result) => {
    if (err) {
      console.error('Error updating user:', err.message);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.json({ message: 'User updated successfully' });
  });
});


app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM user WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
