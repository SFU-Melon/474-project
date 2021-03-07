const pool = require("../db");

const User = {};

User.save = async (data) => {
  const { username, hashed } = data;
  if (username && hashed) {
    try {
      const res = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hashed]
      );
    } catch (err) {
      console.log(err.message);
    }
  }
};

User.getUserByUsername = async (username) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

User.getUserById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    console.log(err.message);
  }
};

User.getAllUsers = async () => {
  try {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
};

User.follows = async (id_1, id_2) => {
  try {
    const res = await pool.query(
      "SELECT * FROM followers WHERE user1 = $1 AND user2 = $2",
      [id_1, id_2]
    );
    if (res.rows.length == 0) {
      await pool.query("INSERT INTO followers (user1, user2) VALUES ($1, $2)", [
        id_1,
        id_2,
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

User.getFollowersAndFollowing = async (id) => {
  try {
    const followers = await pool.query(
      "SELECT user1 FROM followers WHERE user2 = $1",
      [id]
    );
    const following = await pool.query(
      "SELECT user2 FROM followers WHERE user1 = $1",
      [id]
    );
    const followers_arr = followers.rows.map((follower) => follower.user1);
    const following_arr = following.rows.map((follow) => follow.user2);

    return [followers_arr, following_arr];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = User;
