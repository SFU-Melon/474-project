DROP INDEX post_document_idx;
ALTER TABLE posts
    DROP COLUMN document_with_weights;
DROP TRIGGER post_tsvector_update ON posts;
DROP FUNCTION post_tsvector_trigger;

DROP INDEX user_document_idx;
ALTER TABLE users
    DROP COLUMN document_with_weights;
DROP TRIGGER user_tsvector_update ON users;
DROP FUNCTION user_tsvector_trigger;

DROP INDEX plant_document_idx;
ALTER TABLE plants
    DROP COLUMN document_with_weights;
DROP TRIGGER plant_tsvector_update ON plants;
DROP FUNCTION plant_tsvector_trigger;
