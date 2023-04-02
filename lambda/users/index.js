/*
IMPORTANT NOTES:
  * This single file is used to create all user related lambda functions.
  * You can create a new function by adding a new handler function and registering as index.<handlername> (e.g. index.creatUser) in lambda function.
  * Use Node v < 16.x as they have aws-sdk preinstalled. Node v 18 does not!
*/
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create a user in DynamoDB
exports.createUser = async (event) => {
  const body = JSON.parse(event.body);
  const id = body.username
//   const username = body.userId;
  const fname = body.fname;
  const lname = body.lname;
  const dob = body.dob;
  const email = body.email;
  const joindate = new Date().toISOString();
  const profilephoto = body.profilephoto ?? "";

  const params = {
    TableName: 'users',
    Item: {
      id: id,
      //username: username,
      fname: fname,
      lname: lname,
      dob: dob,
      email: email,
      joindate: joindate,
      profilephoto: profilephoto
    },
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  }

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      headers: defaultHeaders,
      body: JSON.stringify({
        id: id,
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: JSON.stringify({ message: error.message })
    };
  }
};

// Get a user from DynamoDB by ID
exports.getUserById = async (event) => {
  const id = event.pathParameters.id;

  const params = {
    TableName: 'users',
    Key: {
      id: id
    }
  };

  const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET'
  }

  try {
    const result = await dynamoDB.get(params).promise();
    //TODO: Need to fetch the lists of users followers and followees here and combine both results into one object.
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      };
    } else {
      return {
        statusCode: 404,
        headers: defaultHeaders,
        body: JSON.stringify({ message: 'User not found' })
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: JSON.stringify({ message: error.message })
    };
  }
};
