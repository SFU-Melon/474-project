const Pool = require("pg").Pool;

let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });
} else {
  pool = new Pool({
    user: "postgres",
    password: "cmpt354",
    host: "localhost",
    port: 5432,
    database: "db354",
  });
}

module.exports = pool;
