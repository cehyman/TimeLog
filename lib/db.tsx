import mysql from 'mysql2/promise';

// Database connection configuration interface
interface DBConfig {
    host: string;
    user: string;
    database: string;
    password: string;
    waitForConnections: boolean;
    connectionLimit: number;
    queueLimit: number;
}

// Database configuration using environment variables
const dbConfig: DBConfig = {
    host: process.env.MARIADB_HOST || 'localhost',
    user: process.env.MARIADB_USER || 'root',
    database: process.env.MARIADB_DATABASE || 'TimeLog',
    password: process.env.MARIADB_PASSWORD || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

export default pool;
