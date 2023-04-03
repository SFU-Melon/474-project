from datetime import datetime
from uuid import uuid4
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3
from boto3.dynamodb.conditions import Attr

# helper
def batchDelete(write_requests,tablename):
    # Use the batch_write_item method to send the write requests to DynamoDB
    while write_requests:
        batch = write_requests[:25]  # DynamoDB supports a maximum of 25 write requests per batch
        write_requests = write_requests[25:]
        response = boto3.client("dynamodb").batch_write_item(RequestItems={tablename: batch})

        # If there are unprocessed items, retry them
        unprocessed_items = response.get('UnprocessedItems', {})
        while unprocessed_items:
            response = boto3.client("dynamodb").batch_write_item(RequestItems=unprocessed_items)
            unprocessed_items = response.get('UnprocessedItems', {})

def lambda_handler(event, context):
    """Setup DB connection"""
    TABLE_NAME = "posts"
    dynamodb = boto3.resource("dynamodb")
    client = boto3.client("dynamodb")
    table = dynamodb.Table(TABLE_NAME)

    METHOD = event["httpMethod"]
    ENDPOINT = event["path"]
    res = None

    """Handle Requests"""
    if METHOD == "GET":
        print("GET")

        if "getPosts" in ENDPOINT:
            params = event["queryStringParameters"]
            filterType = params["filterType"]

            username = ''
            if ('username' in params):
                username = params['username']
            if "tags[]" in params:
                # filter by tags
                filterTags = event["multiValueQueryStringParameters"]["tags[]"]
                # print(f"tags to filter by {filterTags}")

                tagsList = [{"S": tag} for tag in filterTags]
                keyList = [f':{ tags.replace(" ", "") }' for tags in filterTags]
                attrDict = dict(zip(keyList, tagsList))
                filterExp = [f"contains(#tags, {key})" for key in keyList]
                AND = " and "
                OR = " or "

                # print(filterExp)
                # print( attrDict)
                data = client.scan(
                    TableName=TABLE_NAME,
                    FilterExpression=AND.join(filterExp),
                    ExpressionAttributeNames={"#tags": "tags"},
                    ExpressionAttributeValues=attrDict,
                )
            else:
                data = client.scan(TableName=TABLE_NAME)


            if username != "":
                for item in data["Items"]:
                    likeStatus = client.get_item(
                            TableName="likes",
                            Key={'userid':{'S':username},'postid':{'S':item['id']['S']}}
                        )
                    if "Item" in likeStatus:
                        item['val'] = int(likeStatus["Item"]['val']['N'])
            parsed_data = [
                {
                    "id": item["id"]["S"],
                    "location": item["location"]["S"],
                    "datetime": item["datetime"]["S"],
                    "title": item["title"]["S"],
                    "imageurl": item["imageurl"]["S"],
                    "numoflikes": item["numoflikes"]["N"],
                    "tags": item["tags"]["L"],
                    "authorname": item["userId"]["S"],
                    "val": 0 if "val" not in item else item['val']
                }
                for item in data["Items"]
            ]

            for post in parsed_data:
                post["tags"] = [item["S"] for item in post["tags"]]

            # sort by filter type
            key = "numoflikes" if filterType == "hot" else "datetime"
            parsed_data.sort(key=lambda item: item[key], reverse=True)
            res = parsed_data
            # res[0]["event"] = json.dumps(event['requestContext']['identity'])

        elif "getPostLikedNotOwned" in ENDPOINT:
            """Return posts that user has liked but not created"""
            print("getPostLikedNotOwned")
            # print(event)
            userId = event["pathParameters"]["id"]

            likedPosts = table.scan(
                TableName = "likes",
                FilterExpression = "#userid = :id",
                ExpressionAttributeNames = { "#userid" : "userid" },
                ExpressionAttributeValues = { ":id" : userId }
            )

            try:
                likedPosts = [ item["postid"] for item in likedPosts["Items"] ]
                keyList = [f":{i}" for i in range(1, len(likedPosts)+1)]
                attrDict = dict(zip(keyList, likedPosts))
                attrDict[":id"] = userId
                filterExp = "#userId <> :id and #postId in (" + ",".join(keyList) + ")"
                # print(likedPosts)
                # print(filterExp)
                # print(attrDict)

                data = table.scan(
                    TableName = TABLE_NAME,
                    FilterExpression = filterExp,
                    ExpressionAttributeNames = {
                        "#postId" : "id",
                        "#userId" : "userId"
                        },
                    ExpressionAttributeValues = attrDict
                )["Items"]

                for d in data:
                    d["numoflikes"] = str(d["numoflikes"])
                    d["numofcomments"] = str(d["numofcomments"])

                res=data
            except Exception as e:
                print(e)
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

        elif "getPost" in ENDPOINT:
            postId = event["pathParameters"]["postId"]
            queryString = event["queryStringParameters"]
            username = ''
            if (queryString and 'username' in queryString):
                username = queryString['username']
            data = client.get_item(TableName=TABLE_NAME, Key={"id": {"S": postId}})

            try:
                item = data["Item"]
                if username != "":
                    likeStatus = client.get_item(
                            TableName="likes",
                            Key={'userid':{'S':username},'postid':{'S':item['id']['S']}}
                        )
                    if "Item" in likeStatus:
                        item['val'] = int(likeStatus["Item"]['val']['N'])
            except Exception as e:
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

            parsed_data = {
                "id": item["id"]["S"],
                "content": item["content"]["S"],
                "location": item["location"]["S"],
                "datetime": item["datetime"]["S"],
                "title": item["title"]["S"],
                "imageurl": item["imageurl"]["S"],
                "numoflikes": item["numoflikes"]["N"],
                "userid": item["userId"]["S"],
                "authorname": item["userId"]["S"],
                "tags": item["tags"]["L"],
                "val": 0 if "val" not in item else item['val']
            }
            parsed_data["tags"] = [item["S"] for item in parsed_data["tags"]]

            res = parsed_data

        elif "getAllPosts" in ENDPOINT:
            # print("getAllPosts")
            userId = event["pathParameters"]["userId"]

            data = client.scan(
                TableName = TABLE_NAME,
                FilterExpression = "#userId = :id",
                ExpressionAttributeNames = { "#userId" : "userId" },
                ExpressionAttributeValues = { ":id": { "S" : userId } }
            )

            try:
                data = [
                    {
                        "id": item["id"]["S"],
                        "location": item["location"]["S"],
                        "datetime": item["datetime"]["S"],
                        "title": item["title"]["S"],
                        "imageurl": item["imageurl"]["S"],
                        "numoflikes": item["numoflikes"]["N"],
                        "numofcomments": item["numofcomments"]["N"],
                        "tags": item["tags"]["L"],
                        "authorname": item["userId"]["S"],
                    } for item in data["Items"]
                ]

                for post in data:
                    post["tags"] = [item["S"] for item in post["tags"]]

            except Exception as e:
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

            res=data

        elif "savePost" in ENDPOINT:
            print("savePost")
            postId = event["pathParameters"]["postId"]
            userId = data["pathParameters"]['userId']

            try:
                res = client.update_item(
                    TableName="users",
                    Key={
                        'id': {
                          'S': userId
                        }
                    },
                    ExpressionAttributeValues={
                        {
                            ":my_value": {"L": [postId]}
                        }
                    },
                    UpdateExpression="set postlist=list_append(if_not_exists(postlist, :my_value), :my_value)",
                    ReturnValues="UPDATED_NEW"
                )
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({"error": str(e)})
                }

        elif "unsavePost" in ENDPOINT:
            print("unsavePost")
            postId = event["pathParameters"]["postId"]
            userId = data["pathParameters"]['userId']

            try:
                res = client.update_item(
                    TableName="users",
                    Key={
                        'id': {
                          'S': userId
                        }
                    },
                    ExpressionAttributeValues={
                        {
                            ":my_value": {"L": [postId]}
                        }
                    },
                    UpdateExpression="remove postlist :my_value)",
                    ReturnValues="UPDATED_NEW"
                )
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({"error": str(e)})
                }

        elif "getAllSavedPosts" in ENDPOINT:
            """Return all saved posts for user"""
            userId = event["pathParameters"]["userId"]
            print(f"getAllSavedPosts for {userId}")

            try:
                # scan users table for user userId get return all posts that match postlist
                savedPosts = table.scan(
                    TableName = "users",
                    FilterExpression = "#userId = :id",
                    ExpressionAttributeNames = { "#userId": "userId" },
                    ExpressionAttributeValues = { ":id" : userId }
                )["Items"]["postlist"]

                # get all posts
                data = table.scan(
                    TableName= TABLE_NAME,
                    FilterExpression = "#postId in :postList",
                    ExpressionAttributeNames = { "#postId": "id" },
                    ExpressionAttributeValues = { ":postList" : savedPosts }
                )["Items"]

                for d in data:
                    d["numoflikes"] = str(d["numoflikes"])
                    d["numofcomments"] = str(d["numofcomments"])

                res = data
            except Exception as e:
                print(e)
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

    elif METHOD == "POST":
        print("POST")
        if "editPost" in ENDPOINT:
            print("editPost")
            data = json.loads(event['body'])
            postId = event["pathParameters"]["postId"]
            userId = event["pathParameters"]['userId']

            try:
                res = client.update_item(
                    TableName=TABLE_NAME,
                    Key={"id": {"S": data['postId']}},
                    ExpressionAttributeNames={"#L": "location"},
                    ExpressionAttributeValues={
                        ":t": {"S": data["title"]},
                        ":l": {"S": data["location"]},
                        ":c": {"S": data["content"]},
                        ":ta": {"L": [{"S": tag} for tag in data["tags"]]},
                    },
                    UpdateExpression="set title=:t, #L=:l, content=:c, tags=:ta",
                    ReturnValues="UPDATED_NEW",
                )
            except Exception as e:
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

        elif "createPost" in ENDPOINT:
            print("createPost")
            data = json.loads(event["body"])

            # CITATION: https://bitesizedserverless.com/bite/reliable-auto-increments-in-dynamodb/
            # curr_id = table.get_item(
            #     TableName = "Posts",
            #     Key = { "id": {"N": -420},"sortingid":{"N":-420 }},
            #     AttributesToGet = ["sortingid"],
            #     ConsistentRead = True
            # )["Item"]["sortingid"]["N"]
            # next_id = curr_id + 1
            u_id = uuid4()
            timestamp = datetime.today().strftime(
                "%Y-%m-%d"
            )  # casts to .0 instead of ugly .23740

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
                        "TableName": TABLE_NAME,
                        "Item": {
                            "id": {"S": str(u_id)},
                            # "sortingid": {"N": '1'},
                            "datetime": {"S": timestamp},
                            "title": {"S": data["title"]},
                            "location": {"S": data["location"]},
                            "imageurl": {"S": data["imageurl"]},
                            "numoflikes": {"N": "0"},
                            "numofcomments": {"N": "0"},
                            "userId": {"S": data["userId"]},
                            "content": {"S": data["content"]},
                            # "authorname": {"S": data['authorname']},
                            "tags": {"L": [{"S": tag} for tag in data["tags"]]},
                        },
                        "ConditionExpression": "attribute_not_exists(id)",
                    },
                }
            ]

            try:
                client.transact_write_items(TransactItems=transaction)
            except Exception as e:
                # condition check prob failed
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
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
            postId = event["pathParameters"]["postid"]
            userId = event["pathParameters"]["userid"]
            try:
                # delete comments
                comments_data = dynamodb.Table('comments').scan(
                    FilterExpression=Attr('postid').eq(postId)
                )

                # Create a list of write requests to delete the items with the specified comment ids
                write_requests = [{'DeleteRequest': {
                    'Key': {
                        'id': {'S': item['id']}
                    }
                }} for item in comments_data['Items']]
                batchDelete(write_requests,'comments')

                # delete likes
                likes_data = dynamodb.Table('likes').scan(
                    FilterExpression=Attr('postid').eq(postId)
                )
                write_requests = [{'DeleteRequest': {
                    'Key': {
                        'userid': {'S': item['userid']},
                        'postid':{'S':item['postid']}
                        }
                    }} for item in likes_data['Items']]
                batchDelete(write_requests,'likes')

                # delete likescomment
                likescomment_data = dynamodb.Table('likescomment').scan(
                    FilterExpression=Attr('postid').eq(postId)
                )
                write_requests = [{'DeleteRequest': {
                    'Key': {
                        'commentid':{'S':item['commentid']},
                        'userid': {'S': item['userid']}
                    }}} for item in likescomment_data['Items']]
                batchDelete(write_requests,'likescomment')

                res = client.delete_item(
                    TableName=TABLE_NAME, Key={"id": {"S": postId}}
                )
                res['success'] = 1
            # delete related comments, likes, and likescomment entries
            except Exception as e:
                return {
                    "statusCode": 500,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    "body": json.dumps({"error": str(e)}),
                }

    else:  # invalid request
        # raise Exception("Invalid request")
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "Invalid request"}),
        }

    # assume all went well
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(res),
    }


def createPost_data_check(data):
    """Dynamo has no constrains so do that stuff here"""
    # NOTE: might not need, look into conditionalexpression attribute for putitem in transact_write_items
    # TODO: implement this
    print("_")
