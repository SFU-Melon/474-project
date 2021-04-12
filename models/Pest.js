const pool = require("../db");

const Pest = {};

Pest.getAllBySciName = async (sciname) => {
    try {
        if (sciname != undefined) {
            const res = await pool.query(
                "SELECT pestname FROM planthaspests WHERE plantsciname = $1",
                [sciname]
            );
            return res.rows;
        }
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = Pest;