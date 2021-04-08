const Pool = require("pg").Pool;

// DB Config. Need to be same values
if (process.env.NODE_ENV === "production") {
  const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
  });
} else {
  const pool = new Pool({
    user: "postgres",
    password: "cmpt354",
    host: "localhost",
    port: 5432,
    database: "db354",
  });
}

module.exports = pool;
