require('dotenv').config(); // Load environment variables from .env file

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const pgp = require('pg-promise')();

const db = pgp({
    host: dbHost,         // Your PostgreSQL host
    port:dbPort,                // Default PostgreSQL port
    database: dbName,  // Your database name
    user: dbUser,      // Your PostgreSQL username
    password: dbPassword,  // Your PostgreSQL password
  });

module.exports = db;
