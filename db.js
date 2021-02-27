const Pool = require("pg").Pool;

// DB Config. Need to be same values
const pool = new Pool({
  user: "postgres",
  password: "cmpt354",
  host: "localhost",
  port: 5432,
  database: "db354",
});

module.exports = pool;
