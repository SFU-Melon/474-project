const Disease = require("../models/Disease");
const diseaseController = {};

diseaseController.getAllBySciName = async (req, res) => {
  try {
    const { sciname } = req.params;
    const diseases = await Disease.getAllBySciName(sciname);
    return res.json({
      success: true,
      diseases,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

module.exports = diseaseController;
