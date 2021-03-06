const pool = require('../db');

const Post = {};

Post.create = async (data) => {
  const { dateTime, location, imageUrl, content } = data.body;
  const { userId } = data.params;
  console.log(userId, 'userId');
  console.log(data.body);
  try {
    const res = await pool.query(
      'INSERT INTO posts (dateTime, location, imageUrl, userId, content) VALUES ($1, $2,$3,$4,$5) RETURNING *',
      [dateTime, location, imageUrl, userId, content]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.upVote = async (data) => {
  const { userId } = data.params;
  const { postId } = data.body;
  console.log(userId, 'userId');
  console.log(postId, 'postId');
  try {
    const res = await pool.query(
      'INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *',
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
  console.log(userId, 'userId');
  console.log(postId, 'postId');
  try {
    const res = await pool.query(
      'INSERT INTO likes (userid, postid, val) VALUES ($1, $2, $3) RETURNING *',
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
  console.log(userId, 'userId');
  console.log(postId, 'postId');
  try {
    const res = await pool.query(
      'DELETE FROM likes WHERE userid=($1) AND postid=($2)',
      [userId, postId]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
}; 




module.exports = Post;
