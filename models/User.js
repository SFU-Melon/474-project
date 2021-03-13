const pool = require("../db");

const User = {};

User.save = async (data) => {
  const { username, hashed } = data;
  if (username && hashed) {
    try {
      const res = await pool.query(
        "INSERT INTO users (joinDate, username, password) VALUES (to_timestamp($1), $2, $3)",
        [Date.now() / 1000.0, username, hashed]
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

User.unfollows = async (id_1, id_2) => {
  try {
    await pool.query("DELETE FROM followers WHERE user1 = $1 AND user2 = $2", [
      id_1,
      id_2,
    ]);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

User.getFollowersAndFollowing = async (id) => {
  try {
    console.log(id);
    const res = await pool.query(
      "SELECT user1 AS follower, user2 AS following FROM followers WHERE user1 = $1 OR user2 = $1",
      [id]
    );
    let followers = [],
      following = [];
    res.rows.map((item) => {
      if (item.follower === id) {
        following.push(item.following);
      } else {
        followers.push(item.follower);
      }
    });
    console.log(followers);
    console.log(following);
    return [followers, following];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = User;
