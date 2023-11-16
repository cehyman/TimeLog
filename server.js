// MongoDB setup
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TimeLog';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB', err);
    return;
  }

  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // Perform operations on the database here

  // Close the connection when done
  client.close();
});


// Basic Express Server Setup

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
