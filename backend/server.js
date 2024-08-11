// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Optional: For handling CORS issues

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Optional: Enable CORS

// registeration end point
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Example registration logic (replace with real implementation)
  if (email && password) {
    res.status(200).json({ message: 'Account created successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    // Find user in mock database
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Check password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "Sahil", { expiresIn: '1h' });
  
    res.status(200).json({ message: 'Login successful', token });
  });


app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
