const User = require("../models/User");
const Post = require("../models/Post");
const Plant = require("../models/Plant");
const searchController = {};

searchController.searchPosts = async (req, res) => {
  const { value } = req.params;
  try {
    const result = await Post.search(value);
    if (result) {
      return res.json({
        success: true,
        posts: result,
      });
    }
    return res.json({
      success: false,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};

searchController.searchPlants = (req, res) => {};

searchController.searchUsers = (req, res) => {};

searchController.searchAll = (req, res) => {};
module.exports = searchController;
