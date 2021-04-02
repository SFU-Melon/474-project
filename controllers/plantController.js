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

plantController.getPlantById = async (req, res) => {
  try {
    const id = req.params; // TODO: what is params, how do I pass id into it
    
    const plant = await Plant.getPlantById(id);
    return res.json({
      success: true,
      plant,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

module.exports = plantController;
