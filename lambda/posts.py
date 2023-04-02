from datetime import datetime
from uuid import uuid4
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3


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

            if "tags[]" in params:
                # filter by tags
                filterTags = event["multiValueQueryStringParameters"]["tags[]"]
                # print(f"tags to filter by {filterTags}")

                tagsList = [{"S": tag} for tag in filterTags]
                keyList = [f":{tags}" for tags in filterTags]
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

        elif "getPost" in ENDPOINT:
            postId = event["pathParameters"]["postId"]
            data = client.get_item(TableName=TABLE_NAME, Key={"id": {"S": postId}})
            try:
                item = data["Item"]
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
                "userId": item["userId"]["S"],
                "authorname": item["userId"]["S"],
                "tags": item["tags"]["L"],
            }
            parsed_data["tags"] = [item["S"] for item in parsed_data["tags"]]

            res = parsed_data

        elif "getPostLikedNotOwned" in ENDPOINT:
            print("getPostLikedNotOwned")

        elif "getAllPosts" in ENDPOINT:
            print("getAllPosts")

    elif METHOD == "POST":
        print("POST")
        if "editPost" in ENDPOINT:
            print("editPost")
            data = json.loads(event["body"])
            postId = event["pathParameters"]["postId"]

            try:
                res = client.update_item(
                    TableName=TABLE_NAME,
                    Key={"id": {"S": postId}},
                    ExpressionAttributeNames={"#L": "location"},
                    ExpressionAttributeValues={
                        ":t": {"S": data["title"]},
                        ":l": {"S": data["location"]},
                        ":i": {"S": data["imageurl"]},
                        ":c": {"S": data["content"]},
                        ":ta": {"L": data["tags"]},
                    },
                    UpdateExpression="set title=:t, #L=:l, imageurl=:i, content=:c, tags=:ta",
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
            postId = event["pathParameters"]["postId"]

            try:
                res = client.delete_item(
                    TableName=TABLE_NAME, Key={"id": {"S": postId}}
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
