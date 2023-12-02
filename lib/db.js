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

// Export the pool
module.exports = pool.promise();
