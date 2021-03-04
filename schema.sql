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
    content VARCHAR(200),
    location VARCHAR(200),
    imageUrl VARCHAR(200),
    userId uuid references users(id)
);

CREATE TABLE likes(
    userId uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postId uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userId, postId)
);

/*** For testing ***/

/* Delete all rows inside users table */
DELETE FROM users;
/* See all rows inside users table */
SELECT * FROM users;

