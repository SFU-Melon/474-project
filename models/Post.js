const pool = require("../db");

const Post = {};

Post.create = async (data) => {
  const { location, imageUrl, content, title, tags } = data.body;
  const { userId } = data.params;
  const { username: authorname } = data.user;

  try {
    const res = await pool.query(
      "INSERT INTO posts (dateTime, title, location, imageUrl, userId, content, authorname, tags) VALUES (to_timestamp($1),$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        Date.now() / 1000.0,
        title,
        location,
        imageUrl,
        userId,
        content,
        authorname,
        tags
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPosts = async (userId) => {
  try {
    if (userId != undefined) {
      const res = await pool.query(
        "SELECT id, dateTime, title, content, location, imageUrl, numOfLikes, authorname, likes.val FROM posts LEFT JOIN likes ON posts.id = likes.postId AND likes.userId = $1",
        [userId]
      );
      return res.rows;
    }
    const res = await pool.query("SELECT * FROM posts");
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPostsFromUserId = async (userId) => {
  try {
    if (userId != undefined) {
      const res = await pool.query("SELECT * FROM posts WHERE userId = $1", [
        userId,
      ]);
      return res.rows;
    }
  } catch (err) {
    console.error(err.message);
  }
};

Post.getPostLikedNotOwned = async (userId) => {
  try {
    const res = await pool.query(
      "SELECT * FROM likes L, posts P WHERE L.userid = $1 AND L.userid <> P.userid AND P.id = L.postid AND L.val = 1",
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getPostById = async ({ userId, postId }) => {
  try {
    if (userId != undefined) {
      const res = await pool.query(
        "SELECT id, dateTime, title, content, location, imageurl, numoflikes, numofcomments, authorname, posts.userid, val  FROM posts LEFT JOIN likes ON likes.postId = posts.id AND likes.userId = $2 WHERE posts.id = $1",
        [postId, userId]
      );
      return res.rows[0];
    }
    const res = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.checkVoteStatus = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      "SELECT * FROM likes WHERE userId = $1 AND postId = $2",
      [userId, postId]
    );
    if (res.rows[0] == undefined) {
      return 0;
    }
    return res.rows[0].val;
  } catch (err) {
    console.error(err.message);
  }
};

Post.changeNumOfLikes = async (data) => {
  const voteOperation = data.voteOperation;
  const voteStatus = data.voteStatus;
  const { postId } = data.body;
  let change;
  if (voteOperation === "upVote") {
    switch (voteStatus) {
      case 0:
        // no vote -> upVote
        change = 1;
        break;
      case 1:
        // upVote -> cancel
        change = -1;
        break;
      case -1:
        // downVote -> upVote
        change = 2;
        break;
    }
  } else {
    switch (voteStatus) {
      case 0:
        // no vote -> downVote
        change = -1;
        break;
      case 1:
        // upVote -> downVote
        change = -2;
        break;
      case -1:
        // downVote -> cancel
        change = 1;
        break;
    }
  }
  const res = await pool.query(
    "UPDATE posts SET numOfLikes = numOfLikes + $1 WHERE id = $2 RETURNING numOfLikes",
    [change, postId]
  );
  return res.rows[0];
};

Post.upVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      "INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, 1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.downVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      "INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, -1]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.cancelVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  try {
    const res = await pool.query(
      "DELETE FROM likes WHERE userid=($1) AND postid=($2)",
      [userId, postId]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.delete = async (id) => {
  try {
    await pool.query("DELETE FROM posts WHERE id=$1", [id]);
  } catch (err) {
    console.error(err.message);
  }
};

Post.updateNumOfComments = async ({ change, postId }) => {
  //change: 1 or -1
  try {
    const res = await pool.query(
      "UPDATE posts SET numOfComments = numOfComments + $1 WHERE id = $2",
      [change, postId]
    );
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

Post.search = async (value, limit = 10) => {
  try {
    const res = await pool.query(
      "SELECT id, datetime, title, imageurl, location, authorname, numoflikes, numofcomments \
      FROM posts \
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

module.exports = Post;
