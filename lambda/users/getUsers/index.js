const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Define your PostgreSQL database credentials
  const dbConfig = {
    user: "postgres",
    host: "user-profile.crixemfe0mza.us-east-2.rds.amazonaws.com",
    database: "users",
    password: "cmpt474dev",
    port: 5432
  };

  // Create a connection pool to the PostgreSQL database
  const pool = new Pool(dbConfig);

  try {
    // Use a transaction to execute multiple SQL queries together
    await pool.query('BEGIN');

    // Determine whether to fetch data or write data based on the event input
    let result;
    // Define the SQL query to fetch user data from the database
    const selectQuery = 'SELECT * FROM users';

    // Execute the SQL query and retrieve the results
    const { rows } = await pool.query(selectQuery);
    result = rows;
    

    // Commit the transaction to save the changes to the database
    await pool.query('COMMIT');

    // Return the result as a JSON response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    // Roll back the transaction if an error occurs
    await pool.query('ROLLBACK');

    // Return the error message as a JSON response
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    // Release the client from the connection pool
    pool.end();
  }
};
