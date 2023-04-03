/*
IMPORTANT NOTES:
  * This single file is used to create all user related lambda functions.
  * You can create a new function by adding a new handler function and registering as index.<handlername> (e.g. index.creatUser) in lambda function.
  * Use Node v < 16.x as they have aws-sdk preinstalled. Node v 18 does not!
*/
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const defaultHeaders = (method) => {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': `OPTIONS,${method}` 
  }
}

const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';

// Create a user in DynamoDB
// POST
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

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      headers: defaultHeaders(POST),
      body: JSON.stringify({
        id: id,
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ message: error.message })
    };
  }
};

// Get a user from DynamoDB by ID
// GET
exports.getUserById = async (event) => {
  const id = event.pathParameters.id;

  const params = {
    TableName: 'users',
    Key: {
      id: id
    }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    //TODO: Need to fetch the lists of users followers and followees here and combine both results into one object.
    if (result.Item) {
      return {
        statusCode: 200,
        headers: defaultHeaders(GET),
        body: JSON.stringify(result.Item)
      };
    } else {
      return {
        statusCode: 404,
        headers: defaultHeaders(GET),
        body: JSON.stringify({ message: 'User not found' })
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: defaultHeaders(GET),
      body: JSON.stringify({ message: error.message })
    };
  }
};

exports.getTopUsers = async (event) => {
  const LIMIT = 10;
  try {
    const params = {
      TableName: "followers",
      IndexName: "followee-follower-index",
      ProjectionExpression: "followee, follower",
      Select: "SPECIFIC_ATTRIBUTES",
    };

    const response = await dynamoDB.scan(params).promise();
    const followCounts = {};

    for (const item of response.Items) {
      followCounts[item.followee] = (followCounts[item.followee] || 0) + 1;
    }

    const topUsers = Object.entries(followCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, LIMIT);
      
    const userParams = {
      RequestItems: {
        users: {
          Keys: topUsers.map(([username]) => {
            return { id: username };
          }),
          ProjectionExpression: "id, profilephoto",
        },
      },
    };

    const usersResponse = await dynamoDB.batchGet(userParams).promise();
    const userDetails = usersResponse.Responses.users.map((user, index) => {
      return {
        username: user.id,
        id: user.id,
        profilephoto: user.profilephoto,
        numoffollowers: topUsers[index][1],
      };
    });
    return {
      statusCode: 200,
      headers: defaultHeaders(GET),
      body: JSON.stringify(userDetails),
    };

  } catch (error) {
    console.error("Error getting top users:", error);
    return {
      statusCode: 500,
      headers: defaultHeaders(GET),
      body: JSON.stringify({ error: `Error getting top users: ${error}` }),
    };
  }
};

exports.follow = async (event) => {
  const { follower, followee } = JSON.parse(event.body);

  const params = {
    TableName: 'followers',
    Item: { follower, followee }
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ message: 'Follow relationship created' })
    };
  } catch (error) {
    console.error('Error creating follow relationship:', error);
    return {
      statusCode: 500,
      headers: defaultHeaders(POST),
      body: JSON.stringify({ error: 'Error creating follow relationship' })
    };
  }
};

exports.unfollow = async (event) => {
  const { follower, followee } = JSON.parse(event.body);

  const params = {
    TableName: 'followers',
    Key: { follower, followee }
  };

  try {
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      headers: defaultHeaders(DELETE),
      body: JSON.stringify({ message: 'Follow relationship deleted' })
    };
  } catch (error) {
    console.error('Error deleting follow relationship:', error);
    return {
      statusCode: 500,
      headers: defaultHeaders(DELETE),
      body: JSON.stringify({ error: 'Error deleting follow relationship' })
    };
  }
};

const getUsers = async (userIds) => {
  // const uniqueUserIds = [...new Set(userIds)]; // Remove duplicates
  if (userIds.length === 0) {
    return [];
  }
  const keys = userIds.map((id) => ({ id }));
  const params = {
    RequestItems: {
      users: { Keys: keys, ProjectionExpression: 'id, joindate, profilephoto' },
    },
  };

  try {
    const response = await dynamoDB.batchGet(params).promise();
    return response.Responses.users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

exports.getFollowersAndFollowingUsers = async (event) => {
  const { id } = event.pathParameters;

  const paramsFollowers = {
    TableName: 'followers',
    IndexName: 'followee-follower-index', // need to create a GSI with partition key followee and sort key follower
    KeyConditionExpression: 'followee = :id',
    ExpressionAttributeValues: { ':id': id },
    ProjectionExpression: 'follower' // Only retrieve the follower attribute
  };

  const paramsFollowees = {
    TableName: 'followers',
    KeyConditionExpression: 'follower = :id',
    ExpressionAttributeValues: { ':id': id },
    ProjectionExpression: 'followee' // Only retrieve the followee attribute
  };

  try {
    const followersPromise = dynamoDB.query(paramsFollowers).promise();
    const followeesPromise = dynamoDB.query(paramsFollowees).promise();

    // run both queries in parallel
    const [followersData, followeesData] = await Promise.all([followersPromise, followeesPromise]);

    const followersUserIds = followersData.Items.map((item) => item.follower);
    const followeesUserIds = followeesData.Items.map((item) => item.followee);
    
    // Fetch user information in parallel
    const [followers, followees] = await Promise.all([getUsers(followersUserIds), getUsers(followeesUserIds)]);

    return {
      statusCode: 200,
      headers: defaultHeaders(GET),
      body: JSON.stringify({
        followers,
        followees
      })
    };
  } catch (error) {
    console.error('Error getting follow data:', error);
    return {
      statusCode: 500,
      headers: defaultHeaders(GET),
      body: JSON.stringify({ error: `Error getting follow data: ${error.message}` })
    };
  }
};