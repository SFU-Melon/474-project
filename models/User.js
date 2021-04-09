const pool = require("../db");
const User = {};
User.save = async (data) => {
  const { username, hashed, fname, lname, dobFinal, email, profileUrl } = data;
  if (username && hashed && fname && lname && dobFinal && email) {
    try {
      const res = await pool.query(
        "INSERT INTO users (username, password, fname, lname, dob, email, joinDate, profilephoto) VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7), $8)",
        [
          username,
          hashed,
          fname,
          lname,
          dobFinal,
          email,
          Date.now() / 1000.0,
          profileUrl,
        ]
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
    return [followers, following];
  } catch (err) {
    console.log(err.message);
  }
};

User.getFollowersAndFollowingUsers = async (id) => {
  try {
    // get followers
    const followers = await pool.query(
      "SELECT id, username, joindate, profilephoto FROM users WHERE users.id IN (SELECT user1 FROM followers WHERE user2 = $1)",
      [id]
    );
    // get following
    const following = await pool.query(
      "SELECT id, username, joindate, profilephoto FROM users WHERE users.id IN (SELECT user2 FROM followers WHERE user1 = $1)",
      [id]
    );

    return {
      followers: followers.rows,
      following: following.rows,
    };
  } catch (err) {
    console.log(err.message);
  }
};

User.search = async (value, limit = 10) => {
  try {
    const res = await pool.query(
      "SELECT id, username, joindate, profilephoto \
      FROM users \
      WHERE document_with_weights @@ plainto_tsquery($1) \
      ORDER BY ts_rank(document_with_weights, plainto_tsquery($1)) DESC \
      LIMIT $2",
      [value, limit]
    );
    return res.rows;
  } catch (err) {
    console.log(err.mesage);
    return false;
  }
};

User.editProfilePhoto = async (userId, profilePhotoUrl) => {
  try {
    const res = await pool.query(
      "UPDATE users SET profilephoto = $1 WHERE id = $2",
      [profilePhotoUrl, userId]
    );
  } catch (err) {
    console.log(err.message);
  }
};

User.editProfileInfo = async (userId, fname, lname, email, dobFinal) => {
  try {
    const res = await pool.query(
      "UPDATE users SET fname = $1, lname = $2, email = $3, dob = $4 WHERE id = $5",
      [fname, lname, email, dobFinal, userId]
    );
  } catch (err) {
    console.log(err.message);
  }
};

User.getStats = async (id) => {
  try {
    let res = await pool.query(
      "SELECT SUM(numoflikes) as totallikes, SUM(numofcomments) as totalcomments, \
      MAX(numoflikes) as mostlikes, MAX(numofcomments) as mostcomments \
      FROM posts \
      WHERE userid=$1 GROUP BY userid",
      [id]
    );
    if (res.rows) {
      res = res.rows[0];
    }
    const result = {
      mostLikes: res?.mostlikes ? res.mostlikes : 0,
      mostComments: res?.mostcomments ? res.mostcomments : 0,
      totalLikes: res?.totallikes ? res.totallikes : 0,
      totalComments: res?.totalcomments ? res.totalcomments : 0,
    };
    return result;
  } catch (err) {
    console.log(err);
  }
};

User.getEmailFromUsername = async (username) => {
  try {
    let res = await pool.query("SELECT email FROM users WHERE username = $1", [
      username,
    ]);
    if (res.rows.length !== 0) {
      return res.rows[0].email;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

User.resetPassword = async (username, password) => {
  try {
    await pool.query("UPDATE users SET password = $2 WHERE username = $1", [
      username,
      password,
    ]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

User.getTotalAmount = async () => {
  try {
    const res = await pool.query("SELECT COUNT(*) AS numofusers from users");
    return res.rows[0];
  } catch (err) {
    console.err(err);
    return false;
  }
};
module.exports = User;
