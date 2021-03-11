// change this for production
require("dotenv").config();

const fs = require("fs");
const router = require("express").Router();
const aws = require("aws-sdk");
var { nanoid } = require("nanoid");
const { ensureAuthenticated } = require("./middlewares");

TEST_BUCKET = process.env.TEST_BUCKET;
PROFILE_BUCKET = process.env.PROFILE_BUCKET;
POST_BUCKET = process.env.POST_BUCKET;

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-west-1",
});

getPreSignedRequest = async (req, res, bucketName) => {
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
    console.log(data);
    res.json({
      success: true,
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`,
    });
  });
};

router.post("/testUpload", ensureAuthenticated, (req, res) => {
  getPreSignedRequest(req, res, TEST_BUCKET);
});

router.post("/profileUpload", ensureAuthenticated, (req, res) => {
  getPreSignedRequest(req, res, PROFILE_BUCKET);
});

router.post("/postUpload", ensureAuthenticated, (req, res) => {
  getPreSignedRequest(req, res, POST_BUCKET);
});

module.exports = router;
