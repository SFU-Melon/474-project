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

Plant.getPlantById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM plants WHERE id = $1", [id]);
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
};

Plant.search = async (value, limit = 10) => {
  try {
    const res = await pool.query(
      "SELECT sciname, comname, plantphoto \
      FROM plants \
      WHERE document_with_weights @@ plainto_tsquery($1) \
      ORDER BY ts_rank(document_with_weights, plainto_tsquery($1)) DESC \
      LIMIT $2",
      [value, limit]
    );
    return res.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = Plant;
