const pool = require("../db");

const Disease = {};

Disease.getAllBySciName = async (sciname) => {
    try {
        if (sciname != undefined) {
            const res = await pool.query(
                "SELECT diseasename FROM planthasdiseases WHERE plantsciname = $1",
                [sciname]
            );
            return res.rows;
        }
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = Disease;