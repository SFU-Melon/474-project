from datetime import datetime as dt
from uuid import uuid4
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3

def lambda_handler( event, context ):
    """Setup DB connection"""
    # create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    # use the DynamoDB object to select our table
    table = dynamodb.Table('posts')
    METHOD = event["httpMethod"]
    ENDPOINT = event["path"]
    res = None
    """Handle Requests"""
    if METHOD == "GET":
        print("GET")

        if "getPosts" in ENDPOINT:
            print("getPosts")

        elif "postId" in ENDPOINT:
            print("postId")

        elif "getPostLikedNotOwned" in ENDPOINT:
            print("getPostLikedNotOwned")

        elif "getAllPosts" in ENDPOINT:
            print("getAllPosts")

    elif METHOD == "POST":
        print("POST")
        if "editPost" in ENDPOINT:
            print("editPost")

        elif "createPost" in ENDPOINT:
            print("createPost")
            data = json.loads(event['body'])

            # CITATION: https://bitesizedserverless.com/bite/reliable-auto-increments-in-dynamodb/
            curr_id = table.get_item(
                TableName = "Posts",
                Key = { "id": {"N": -420} },
                AttributesToGet = ["LastId"],
                ConsistentRead = True
            )["Item"]["LastID"]["N"]
            next_id = curr_id + 1
            u_id = uuid4()
            timestamp = float(int(dt.today().timestamp())) # casts to .0 instead of ugly .23740

            transaction = [
                {
                    # this is to check for sortingid, SERIAL work around
                    "Update": {
                    "TableName": "posts",
                    "Key": { "id": {"N": -420} },
                    "ConditionExpression": "LastID = :current_id",
                    "UpdateExpression": "SET LastID = LastID + :incr",
                    "ExpressionAttributeValues": {
                        ":incr": {"N": 1},
                        ":current_id": {"N": curr_id},
                        },
                    },
                },
                {
                    # this should
                    "Put": {
                    "TableName": "Users",
                    "Item": {
                        "id": {"N", u_id},
                        "sortingid": {"N": next_id},
                        "datetime": {"S": timestamp},
                        "title": {"S": data['title']},
                        "location": {"S": data["location"]},
                        "imageUrl": {"S": data['imageUrl']},
                        "numoflikes": {"N": 0},
                        "numofcomments": {"N": 0},
                        "userId": {"N": data['userId']},
                        "content": {"S": data['content']},
                        # "authorname": {"S": data['authorname']},
                        "tags": {"SS": data['tags']}
                        },
                    "ConditionExpression": "attribute_not_exists(id)"
                    },
                }
            ]

            try:
                table.transact_write_items(
                    TransactItems = transaction
                )
            except Exception as e:
                # condition check prob failed
                return {
                    'statusCode': 500,
                    'body': json.dumps({"error": str(e)})
                }
        # transact_write_items doesnt return item so just append
        # some fields to the input dict and return it instead
        res = data
        res["id"] = u_id
        res["sortingid"] = next_id
        res["datetime"] = timestamp
        res["numoflikes"] = 0
        res["numofcomments"] = 0

    elif METHOD == "DELETE":
        print("DELETE")

    else: # invalid request
        # raise Exception("Invalid request")
        return {
                'statusCode': 400,
                'body': json.dumps({"error": "Invalid request"})
        }

    # assume all went well
    return {
        "statusCode": 200,
        "body": json.dumps(res)
    }



def createPost_data_check(data):
    """Dynamo has no constrains so do that stuff here"""
    #NOTE: might not need, look into conditionalexpression attribute for putitem in transact_write_items
    #TODO: implement this
    print("_")