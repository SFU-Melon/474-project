CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    joindate TIMESTAMP NOT NULL,
    profilephoto VARCHAR(200),
    UNIQUE (username)
);

CREATE TABLE plants(
    id SERIAL PRIMARY KEY,
    sciname varchar(100) NOT NULL,
    comname varchar(100) NOT NULL,
    description TEXT NOT NULL,
    plantinstr TEXT,
    growinstr TEXT,
    careinstr TEXT,
    plantphoto VARCHAR(200),
    UNIQUE (sciname)
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sortingid SERIAL,
    dateTime TIMESTAMP NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    location VARCHAR(200),
    imageurl VARCHAR(200),
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    numofcomments INTEGER DEFAULT 0 NOT NULL,
    authorname VARCHAR(200),
    tags TEXT[],
    userid uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE tags(
    name VARCHAR(50) PRIMARY KEY
);

CREATE TABLE likes(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMRY KEY(userid, postid)
);

CREATE TABLE followers(
    user1 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user2 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMP NOT NULL,
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    content TEXT
);

CREATE TABLE likescomment(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    commentid uuid REFERENCES comments(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userid, commentid, postid)
);

CREATE TABLE outdoor(
    id SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,
    outdoorclimate DECIMAL,
    PRIMARY KEY(id)
);

CREATE TABLE indoor(
    id SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,   
    temperature DECIMAL,
    humidity DECIMAL,
    PRIMARY KEY(id)
);

CREATE TABLE plantdiseases(
    id SERIAL,
    name VARCHAR(100),
    plantid SERIAL NOT NULL REFERENCES plants (id) ON DELETE CASCADE,   
    description TEXT,
    PRIMARY KEY(id, plantid)
);


CREATE TABLE saves(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    PRIMARY KEY(userId, postId)
);