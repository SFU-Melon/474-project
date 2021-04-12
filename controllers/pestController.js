const Pest = require("../models/Pest");
const pestController = {};

pestController.getAllBySciName = async (req, res) => {
  try {
    const { sciname } = req.params;
    const pests = await Pest.getAllBySciName(sciname);
    return res.json({
      success: true,
      pests,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
    });
  }
};

module.exports = pestController;
