const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    database: process.env.MARIADB_DATABASE,
    password: process.env.MARIADB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Debugging: Log when a new connection is made
pool.on('connection', (connection) => {
    console.log(`New connection made with ID: ${connection.threadId}`);
});

// Debugging: Log when a connection is acquired from the pool
pool.on('acquire', (connection) => {
    console.log(`Connection ${connection.threadId} acquired`);
});

// Debugging: Log when all connections are released
pool.on('release', (connection) => {
    console.log(`Connection ${connection.threadId} released`);
});

// Debugging: Error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export the pool with promise support
module.exports = pool.promise();
