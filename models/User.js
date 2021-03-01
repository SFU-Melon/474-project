const pool = require("../db");

const User = {};

User.save = async (data) => {
  const { username, hashed } = data;
  if (username && hashed) {
    try {
      const res = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashed]
      );
    } catch (err) {
      console.log(err.message);
    }
  }
};

User.getUserByUsername = async (username) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

User.getUserById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = User;
