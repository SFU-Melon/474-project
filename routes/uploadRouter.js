// change this for production
require("dotenv").config();

const fs = require("fs");
const router = require("express").Router();
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { ensureAuthenticated } = require("./middlewares");

const path = require("path");
const filePath = path.join(__dirname, "app-nav.jpg");

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

getPreSignedRequest = async (req, res, bucketName) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  console.log("request body is", req.body);
  const fileKey = uuidv4();
  console.log("filekey", fileKey);
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileContent,
    Expires: 300,
    ContentType: "jpg",
    ACL: "public-read",
  };
  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    console.log(data);
    const returnData = {
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileKey}`,
    };
    res.json({ success: true, data: { returnData } });
  });
};

router.get("/upload", (req, res) => {
  getPreSignedRequest(req, res, "testbucket-354");
});

module.exports = router;
