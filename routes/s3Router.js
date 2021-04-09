// change this for production
require("dotenv").config();

const router = require("express").Router();
const aws = require("aws-sdk");
var { nanoid } = require("nanoid");
const { ensureAuthenticated } = require("./middlewares");

TEST_BUCKET = process.env.TEST_BUCKET;
PROFILE_BUCKET = process.env.PROFILE_BUCKET;
POST_BUCKET = process.env.POST_BUCKET;
/* FOR DEMO */
DEMO_BUCKET = process.env.DEMO_BUCKET;

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-west-1",
});

const getPreSignedRequest = async (req, res, bucketName) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileKey = nanoid();
  const fileType = req.body.fileType;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Expires: 300,
    ContentType: fileType,
    ACL: "public-read",
  };
  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    res.json({
      success: true,
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`,
    });
  });
};

router.post("/testUpload", (req, res) => {
  getPreSignedRequest(req, res, TEST_BUCKET);
});

router.post("/profileUpload", (req, res) => {
  getPreSignedRequest(req, res, DEMO_BUCKET); //change back to PROFILE_BUCKET
});

router.post("/postUpload", ensureAuthenticated, (req, res) => {
  getPreSignedRequest(req, res, DEMO_BUCKET); //change back to POST_BUCKET
});

const deleteS3Object = async (req, res, bucketName) => {
  s3 = new aws.S3();
  const { imageurl } = req.body;
  const key = imageurl.split("/")[3];
  try {
    await s3.deleteObject({ Bucket: bucketName, Key: key }).promise();
    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};

router.post("/deleteOldProfile", ensureAuthenticated, (req, res) => {
  deleteS3Object(req, res, DEMO_BUCKET); //change back to PROFILE_BUCKET
});

router.post("/deleteOldPostImage", ensureAuthenticated, (req, res) => {
  deleteS3Object(req, res, DEMO_BUCKET); //change back to POST_BUCKET
});
module.exports = router;
