from datetime import datetime
from uuid import uuid4
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3



def lambda_handler( event, context ):
    """Setup DB connection"""
    # create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    client = boto3.client('dynamodb')
    # use the DynamoDB object to select our table
    table = dynamodb.Table('Posts')
    METHOD = event["httpMethod"]
    ENDPOINT = event["path"]
    res = None
    """Handle Requests"""
    if METHOD == "GET":
        print("GET")

        if "getPosts" in ENDPOINT:
            data = client.scan(
                TableName='posts'
            )
            parsed_data = [{"id": item["id"]["S"],"content": item["content"]["S"],"location":item["location"]["S"],"datetime":item["datetime"]["S"],
                "title":item["title"]["S"],"imageurl":item["imageurl"]["S"], "numoflikes":item["numoflikes"]["N"], "userId":item["userId"]["S"], "authorname":item["userId"]["S"]
            } for item in data['Items']]
            res=parsed_data

        elif "getPost" in ENDPOINT:
            postId = event["pathParameters"]["postId"]
            data = client.get_item(
                TableName='posts',
                Key={
                    'id': {
                      'S': postId
                    }
                }
              )
            item = data['Item']
            parsed_data = {"id": item["id"]["S"],"content": item["content"]["S"],"location":item["location"]["S"],"datetime":item["datetime"]["S"],
                "title":item["title"]["S"],"imageurl":item["imageurl"]["S"],"numoflikes":item["numoflikes"]["N"], "userId":item["userId"]["S"], "authorname":item["userId"]["S"]}
            res = parsed_data

        elif "getPostLikedNotOwned" in ENDPOINT:
            print("getPostLikedNotOwned")

        elif "getAllPosts" in ENDPOINT:
            print("getAllPosts")

    elif METHOD == "POST":
        print("POST")
        if "editPost" in ENDPOINT:
            print("editPost")
            data = json.loads(event['body'])
            postId = event["pathParameters"]["postId"]

            try:
                res = client.update_item(
                    TableName='posts',
                    Key={
                        'id': {
                          'S': postId
                        }
                    },
                    ExpressionAttributeNames={
                        "#L":"location"
                    },
                    ExpressionAttributeValues={
                        ":t": {"S": data["title"]},
                        ":l": {"S": data["location"]},
                        ":i": {"S": data["imageurl"]},
                        ":c": {"S": data["content"]},
                        ":ta": {"SS": data["tags"]}
                    },
                    UpdateExpression="set title=:t, #L=:l, imageurl=:i, content=:c, tags=:ta",
                    ReturnValues="UPDATED_NEW"
                )
            except Exception as e:
                return {
                    'statusCode': 500,
                    'body': json.dumps({"error": str(e)})
                }

        elif "createPost" in ENDPOINT:
            print("createPost")
            data = json.loads(event['body'])

            # CITATION: https://bitesizedserverless.com/bite/reliable-auto-increments-in-dynamodb/
            # curr_id = table.get_item(
            #     TableName = "Posts",
            #     Key = { "id": {"N": -420},"sortingid":{"N":-420 }},
            #     AttributesToGet = ["sortingid"],
            #     ConsistentRead = True
            # )["Item"]["sortingid"]["N"]
            # next_id = curr_id + 1
            u_id = uuid4()
            timestamp = datetime.today().strftime('%Y-%m-%d') # casts to .0 instead of ugly .23740

            transaction = [
                # {
                #     # this is to check for sortingid, SERIAL work around
                #     "Update": {
                #     "TableName": "posts",
                #     "Key": { "id": {"N": -420} },
                #     "ConditionExpression": "sortingid = :current_id",
                #     "UpdateExpression": "SET sortingid = sortingid + :incr",
                #     "ExpressionAttributeValues": {
                #         ":incr": {"N": 1},
                #         ":current_id": {"N": curr_id},
                #         },
                #     },
                # },
                {
                    # this should
                    "Put": {
                    "TableName": "posts",
                    "Item": {
                        "id": {"S": str(u_id)},
                        # "sortingid": {"N": '1'},
                        "datetime": {"S": timestamp},
                        "title": {"S": data['title']},
                        "location": {"S": data["location"]},
                        "imageurl": {"S": data['imageurl']},
                        "numoflikes": {"N": '0'},
                        "numofcomments": {"N": '0'},
                        "userId": {"S": data['userId']},
                        "content": {"S": data['content']},
                        # "authorname": {"S": data['authorname']},
                        "tags": {"SS": data['tags']}
                        },
                    "ConditionExpression": "attribute_not_exists(id)"
                    },
                }
            ]

            try:
                client.transact_write_items(
                    TransactItems = transaction
                )
            except Exception as e:
                # condition check prob failed
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({"error": str(e)})
                }
            # transact_write_items doesnt return item so just append
            # some fields to the input dict and return it instead
            res = data
            res["id"] = str(u_id)
            # res["sortingid"] = next_id
            res["datetime"] = timestamp
            res["numoflikes"] = 0
            res["numofcomments"] = 0

    elif METHOD == "DELETE":
        print("DELETE")
        if "deletePost" in ENDPOINT:
            print("deletePost")
            postId = event["pathParameters"]["postId"]

            try:
                res = client.delete_item(
                    TableName='posts',
                     Key={
                        'id': {
                             'S': postId
                        }
                    }
                )

            except Exception as e:
                return {
                    'statusCode': 500,
                    'body': json.dumps({"error": str(e)})
                }

    else: # invalid request
        # raise Exception("Invalid request")
        return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
                'body': json.dumps({"error": "Invalid request"})
        }

    # assume all went well
    return {
        "statusCode": 200,
        'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
        "body": json.dumps(res)
    }



def createPost_data_check(data):
    """Dynamo has no constrains so do that stuff here"""
    #NOTE: might not need, look into conditionalexpression attribute for putitem in transact_write_items
    #TODO: implement this
    print("_")
