const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Define your PostgreSQL database credentials
  const dbConfig = {
    user: "postgres",
    host: "posts.crixemfe0mza.us-east-2.rds.amazonaws.com",
    database: "posts",
    password: "cmpt474dev",
    port: 5432
  };

  // Create a connection pool to the PostgreSQL database
  const pool = new Pool(dbConfig);

  try {
    // Use a transaction to execute multiple SQL queries together
    await pool.query('BEGIN');
    const { filterType, userId, val, sortingId, tags } = event["queryStringParameters"];
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
      result = res.rows;
    }
    else {
        //If the user doesn't exist
        const res = await pool.query(
            `SELECT * FROM posts p
            ${wherePart}
            ${orderByPart}
            LIMIT 6`
        );
        result = res.rows;
    }
    

    // Commit the transaction to save the changes to the database
    await pool.query('COMMIT');

    // Return the result as a JSON response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    // Roll back the transaction if an error occurs
    await pool.query('ROLLBACK');

    // Return the error message as a JSON response
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    // Release the client from the connection pool
    pool.end();
  }
};
