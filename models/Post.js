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
        tags,
      ]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

Post.getPosts = async ({ filterType, userId, val, sortingId, tags }) => {
  //I NEED TO FIX TIME STAMP.
  // val = '2021-03-28T07:39:22.668Z' --> why is it 07 when it's 16????
  // BUT I NEED val = '2021-03-28 16:39:22.668'
  // MANAGED TO  FIX IT but idk if it'll work for everyone. I don't get timestamp LOL
  try {
    // Initializing orderPart
    let orderByPart = "";
    if (filterType === "hot") {
      orderByPart = `ORDER BY numoflikes DESC, sortingid ASC`;
    } else {
      orderByPart = `ORDER By datetime DESC, sortingid ASC`;
    }

    // Initializing wherePart
    let wherePart = "";
    if (val !== undefined) {
      //When it's not the first time it fetches posts -> lastElement data is null. -> wherePart=""
      wherePart = `WHERE ${
        filterType === "hot"
          ? `((numoflikes < ${val}) OR (numoflikes = ${val} AND sortingid > ${sortingId}))`
          : `datetime <  (select '${val}'::timestamptz) `
      }`;
    }

    if (tags !== undefined) {
      let subQuery = "SELECT name from tags WHERE";
      tags.forEach((tag, i) => {
        subQuery += `${i === 0 ? "" : " OR"} name = '${tag}'`;
      });
      wherePart += `${val !== undefined ? " AND" : "WHERE"} NOT EXISTS ( 
        SELECT name FROM (${subQuery}) as SUB 
        WHERE name NOT IN (
          SELECT UNNEST(tags) from posts where id = p.id
        )
      )`;
    }

    //If the user exists (logged in)
    if (userId != undefined) {
      const res = await pool.query(
        `SELECT id, dateTime, title, content, numofcomments, location, imageUrl, numOfLikes, authorname, sortingid, likes.val, tags
        FROM posts p
        LEFT JOIN likes ON p.id = likes.postId AND likes.userId = $1
        ${wherePart}
        ${orderByPart}
        LIMIT 6`,
        [userId]
      );
      return res.rows;
    }
    //If the user doesn't exist
    const res = await pool.query(
      `SELECT * FROM posts p
      ${wherePart}
      ${orderByPart}
      LIMIT 6`
    );
    return res.rows;
  } catch (err) {
    console.error(err.message);
  }
};

Post.getAllPostsFromUserId = async (userId) => {
  try {
    if (userId != undefined) {
      const res = await pool.query(
        "SELECT * FROM posts WHERE userId = $1 ORDER BY datetime DESC",
        [userId]
      );
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

Post.editPostById = async (data) => {
  const { userId } = data.params;
  const { postId, title, content, location, tags } = data.body;
  try {
    if (userId && postId && title) {
      const res = await pool.query(
        `UPDATE posts 
        SET title = $1, content = $2, location = $3, tags = $4
        WHERE id = $5 AND userid = $6`,
        [title, content, location, tags, postId, userId]
      );

      return res.rows[0];
    }
  } catch (err) {
    console.error(err.message);
  }
};

Post.getPostById = async ({ userId, postId }) => {
  try {
    if (userId != undefined) {
      const res = await pool.query(
        `SELECT id, dateTime, title, content, location, imageurl, numoflikes, numofcomments, authorname, posts.userid, tags, likes.val 
         FROM posts 
         LEFT JOIN likes ON likes.postId = posts.id AND likes.userId = $2 
         WHERE posts.id = $1`,
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

//Voting
Post.checkVoteStatus = async (data) => {
  const { userId } = data.params;
  const { votedId: postId } = data.body;
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
  const { votedId: postId } = data.body;
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
  const { votedId: postId } = data.body;
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
  const { votedId: postId } = data.body;
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
  const { votedId: postId } = data.body;
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

Post.delete = async (data) => {
  const { postId, userId } = data.params;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1 AND userid = $2", [
      postId,
      userId,
    ]);
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

Post.search = async (
  { value, lastElementSubVal, lastElementRank, sortingId },
  limit = 5
) => {
  //MIGHT NOT NEED ELEMENTSubVal
  try {
    // Initializing wherePart
    let wherePart = "";
    if (lastElementRank != undefined) {
      wherePart = `WHERE (rank < ${lastElementRank})
       OR (rank = ${lastElementRank} AND numoflikes < ${lastElementSubVal}) 
       OR (rank = ${lastElementRank} AND numoflikes = ${lastElementSubVal} AND sortingid > ${sortingId})`;
    }
    const res = await pool.query(
      `SELECT * FROM (
      SELECT id, datetime, title, imageurl, location, tags, authorname, numoflikes, numofcomments, sortingid, ts_rank(document_with_weights, plainto_tsquery($1))::numeric AS rank \
      FROM posts \
      WHERE document_with_weights @@ plainto_tsquery($1)\
      ORDER BY rank DESC, numoflikes DESC, sortingid ASC) AS SUB\
      ${wherePart}
      LIMIT $2`,
      [value, limit]
    );
    return res.rows;
  } catch (err) {
    console.log(err.mesage);
    return false;
  }
};

Post.save = async (postId, userId) => {
  try {
    await pool.query("INSERT INTO saves (userid, postid) VALUES ($1, $2)", [
      userId,
      postId,
    ]);
    return true;
  } catch (err) {
    console.log(err.mesage);
    return false;
  }
};

Post.unsave = async (postId, userId) => {
  try {
    await pool.query("DELETE FROM saves WHERE userid = $1 AND postid = $2", [
      userId,
      postId,
    ]);
    return true;
  } catch (err) {
    console.log(err.mesage);
    return false;
  }
};

Post.checkSaveStatus = async (postId, userId) => {
  try {
    const res = await pool.query(
      "SELECT * FROM saves WHERE userid = $1 AND postid = $2",
      [userId, postId]
    );
    return res.rows.length !== 0;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

Post.getAllSavedPosts = async (userId) => {
  try {
    const res = await pool.query(
      "SELECT * FROM posts WHERE id IN (SELECT s.postid FROM saves s WHERE s.userid = $1) ORDER BY datetime DESC",
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

module.exports = Post;
