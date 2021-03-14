const Plant = require("../models/Plant");
const plantController = {};

plantController.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.getAll();
    return res.json({
      success: true,
      plants,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

module.exports = plantController;
