const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timelog'
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// ... (Routes will be here)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Register
app.post('/register', async (req, res) => {
  try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
          if (err) throw err;
          res.status(201).send('User registered successfully');
      });
  } catch (error) {
      res.status(500).send('Server error');
  }
});

//Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          const comparison = await bcrypt.compare(password, results[0].password);
          if (comparison) {
              const token = jwt.sign({ id: results[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
              res.json({ token });
          } else {
              res.status(401).send('Incorrect password');
          }
      } else {
          res.status(404).send('User not found');
      }
  });
});

