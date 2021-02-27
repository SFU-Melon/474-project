const pool = require("../db");

const User = {};

User.save = async (data) => {
  const { email, hashed } = data;
  if (email && hashed) {
    try {
      const res = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashed]
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  }
};

User.getUserByEmail = async (email) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("Res: ", res);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

User.getUserById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log("Res: ", res);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = User;
