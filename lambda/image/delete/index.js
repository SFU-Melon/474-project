const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const defaultHeaders = (method) => {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': `OPTIONS,${method}` 
    }
}

const DELETE = 'DELETE';

exports.deleteImage = async (event) => {
    const {imageUrl} = JSON.parse(event.body);
  
    // Extract the bucket and key from the URL
    const bucket = imageUrl.split('/')[2].split('.')[0];
    const key = imageUrl.split('/').slice(3).join('/');
  
    // Delete the object from S3
    try {
      const deleteParams = {
        Bucket: bucket,
        Key: key,
      };
  
      await s3.deleteObject(deleteParams).promise();
  
      return {
        statusCode: 200,
        headers: defaultHeaders(DELETE),
        body: JSON.stringify({
          message: 'Image deleted successfully',
        }),
      };
    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        headers: defaultHeaders(DELETE),
        body: JSON.stringify({
          message: `Error deleting image ${error.message}`,
        }),
      };
    }
  };