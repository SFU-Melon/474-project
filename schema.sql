CREATE DATABASE db354;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fname VARCHAR(200) NOT NULL,
    lname VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    joindate TIMESTAMPTZ NOT NULL,
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
    hardiness TEXT,
    exposure TEXT,
    waterNeed TEXT,
    plantphoto VARCHAR(200),
    UNIQUE (sciname)
);

CREATE TABLE plantdiseases(
    diseaseName VARCHAR(100) PRIMARY KEY,
    description TEXT
);

CREATE TABLE plantHasDiseases(
    plantSciName varchar(100) NOT NULL REFERENCES plants (sciname) ON DELETE CASCADE,
    diseaseName varchar(100) NOT NULL REFERENCES plantdiseases (diseaseName) ON DELETE CASCADE,
    PRIMARY KEY (plantSciName, diseaseName)
);

CREATE TABLE plantpests(
    pestName VARCHAR(100) PRIMARY KEY,
    description TEXT
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    sortingid SERIAL,
    dateTime TIMESTAMPTZ NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    location VARCHAR(200),
    imageurl VARCHAR(200),
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    numofcomments INTEGER DEFAULT 0 NOT NULL,
    authorname VARCHAR(200) NOT NULL,
    tags TEXT[],
    userid uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE tags(
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE likes(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER,
    PRIMARY KEY(userId, postId)
);

CREATE TABLE followers(
    follower uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    followee uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY(follower, followee)
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMPTZ NOT NULL,
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


CREATE TABLE saves(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    PRIMARY KEY(userId, postId)
);


ALTER TABLE posts
  ADD COLUMN document_with_weights tsvector;
update posts
set document_with_weights = setweight(to_tsvector(title), 'A') ||
  setweight(to_tsvector(coalesce(authorname, '')), 'B') ||
    setweight(to_tsvector(coalesce(content, '')), 'C') ||
    setweight(to_tsvector(coalesce(location, '')), 'D');
CREATE INDEX post_document_idx
  ON posts
  USING GIN (document_with_weights);


ALTER TABLE users
  ADD COLUMN document_with_weights tsvector;
update users
set document_with_weights = setweight(to_tsvector(username), 'A') ||
  setweight(to_tsvector(coalesce(fname, '')), 'B') ||
    setweight(to_tsvector(coalesce(lname, '')), 'B');
CREATE INDEX user_document_idx
  ON users
  USING GIN (document_with_weights);


ALTER TABLE plants
  ADD COLUMN document_with_weights tsvector;
update plants
set document_with_weights = setweight(to_tsvector(sciname), 'A') ||
  setweight(to_tsvector(comname), 'B') ||
    setweight(to_tsvector(description), 'C');
CREATE INDEX plant_document_idx
  ON plants
  USING GIN (document_with_weights);


CREATE FUNCTION post_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.authorname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.content, '')), 'C')
  || setweight(to_tsvector('english', coalesce(NEW.location, '')), 'D');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER post_tsvector_update BEFORE INSERT OR UPDATE
    ON posts FOR EACH ROW EXECUTE PROCEDURE post_tsvector_trigger();


CREATE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.username, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.fname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.lname, '')), 'B');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER user_tsvector_update BEFORE INSERT OR UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();


CREATE FUNCTION plant_tsvector_trigger() RETURNS trigger AS $$
begin
  NEW.document_with_weights :=
  setweight(to_tsvector('english', coalesce(NEW.sciname, '')), 'A')
  || setweight(to_tsvector('english', coalesce(NEW.comname, '')), 'B')
  || setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C');
  return NEW;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER plant_tsvector_update BEFORE INSERT OR UPDATE
    ON plants FOR EACH ROW EXECUTE PROCEDURE plant_tsvector_trigger();
