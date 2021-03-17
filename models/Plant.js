const pool = require("../db");

const Plant = {};

Plant.getAll = async () => {
  try {
    const res = await pool.query("SELECT * FROM plants");
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = Plant;
