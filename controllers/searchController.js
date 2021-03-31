const User = require("../models/User");
const Post = require("../models/Post");
const Plant = require("../models/Plant");
const searchController = {};

searchController.searchPosts = async (req, res) => {
  const { value } = req.params;
  const {
    lastElementSubVal = undefined,
    lastElementRank = undefined,
    sortingId = undefined,
  } = req.query;
  const data = {
    value,
    lastElementSubVal,
    lastElementRank,
    sortingId,
  };
  try {
    const result = await Post.search(data);
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

searchController.searchPlants = async (req, res) => {
  const { value } = req.params;
  try {
    const result = await Plant.search(value);
    return res.json({
      success: true,
      plants: result,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};

searchController.searchUsers = async (req, res) => {
  const { value } = req.params;
  try {
    const result = await User.search(value);
    if (result) {
      return res.json({
        success: true,
        users: result,
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

searchController.searchAll = async (req, res) => {
  const { value } = req.params;
  const {
    filterType,
    lastElementSubVal = undefined,
    lastElementRank = undefined,
    sortingId = undefined,
  } = req.query;
  const data = {
    value,
    filterType,
    lastElementSubVal,
    lastElementRank,
    sortingId,
  };
  try {
    const posts = await Post.search(data, 5);
    const plants = await Plant.search(value, 5);
    const users = await User.search(value, 5);
    return res.json({
      success: true,
      posts,
      plants,
      users,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};
module.exports = searchController;
