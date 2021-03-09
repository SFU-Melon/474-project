CREATE DATABASE db354;

/* Run this before creating the table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (username) 
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMP,
    title VARCHAR(200),
    content VARCHAR(200),
    location VARCHAR(200),
    imageUrl VARCHAR(200),
    numOfLikes INTEGER DEFAULT 0,
    userId uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE likes(
    userId uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postId uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userId, postId)
);
CREATE TABLE followers(
    user1 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user2 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
);


/*** For testing ***/

/* Delete all rows inside users table */
DELETE FROM users;
/* See all rows inside users table */
SELECT * FROM users;

/* Selecting content and numOflikes from posts table*/
SELECT content, numOfLikes FROM posts;