const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'restaurants_db',
  port: 3306 
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/restaurants', (req, res) => {
  db.query('SELECT * FROM restaurants', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));