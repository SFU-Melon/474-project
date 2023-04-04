const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const defaultHeaders = (method) => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': `OPTIONS,${method}` 
    }
}

const POST = 'POST';

exports.uploadImage = async (event) => {
  const parser = require("lambda-multipart-parser");

  const result = await parser.parse(event);
  const { content, filename, contentType } = result.files[0];
  
  // Check if the content type is supported
  if (!['image/jpeg', 'image/png'].includes(contentType)) {
    const response = {
      statusCode: 404,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ message: `Unsupported content type: ${contentType}` }),
    };
    return response;
  }

  const customFileName = `${Date.now()}_${filename}`; // Add a timestamp to the file name to make it unique

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: customFileName,
    Body: content,
    ContentType: contentType,
    // ACL: 'public-read', // Make the image public so it can be viewed in your React app
  };
  // console.log("PARAMS: ", params);
  try {
    const data = await s3.upload(params).promise();
    const response = {
      statusCode: 200,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ imageUrl: data.Location }),
    };
    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ message: `Error uploading file to S3. ${err.meesage}` }),
    };
    return response;
  }
};