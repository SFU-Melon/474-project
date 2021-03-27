const aws = require("aws-sdk");

TEST_BUCKET = "testbucket-354";
PROFILE_BUCKET = "profile-bucket-354";
POST_BUCKET = "post-bucket-354";

aws.config.update({
  accessKeyId: "<ACCESS_KEY>",
  secretAccessKey: "<SECRET_ACCESS_KEY>",
  region: "us-west-1",
});

const getAllUrlKeysFromDB = async () => {
  try {
    const profiles = await pool.query(
      "SELECT profilephoto FROM users WHERE profilephoto IS NOT NULL AND profilephoto != '{}'"
    );
    const posts = await pool.query(
      "SELECT imageurl FROM posts WHERE imageurl IS NOT NULL"
    );
    const profile_keys = profiles.rows.map(
      (item) => item.profilephoto.split("/")[3]
    );
    const post_keys = posts.rows.map((item) => item.imageurl.split("/")[3]);
    return { profile_keys, post_keys };
  } catch (err) {
    console.log(err);
  }
};

const cleanUp = async (bucketName, keys) => {
  s3 = new aws.S3();

  var bucketParams = {
    Bucket: bucketName,
  };
  try {
    const res = await s3.listObjectsV2(bucketParams).promise();
    res.Contents.forEach((item) => {
      if (!keys.includes(item.Key)) {
        console.log(item.Key);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteS3Object = async (bucketName, key) => {
  s3 = new aws.S3();
  return s3.deleteObject({ Bucket: bucketName, Key: key }).promise();
};
