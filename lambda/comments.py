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
def lambda_handler( event, context ):
    """Setup DB connection"""
    client = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('comments')
    # use the DynamoDB object to select our table
    METHOD = event["httpMethod"]
    ENDPOINT = event["path"]
    PATHPARAMS = event["pathParameters"]
    res = {}
    """Handle Requests"""
    try:
        if METHOD == "GET":

            if "getComments" in ENDPOINT:
                queryString = event["queryStringParameters"]
                username = ''
                if (queryString and 'username' in queryString):
                    username = queryString['username']
                data = table.scan(
                    FilterExpression=Attr('postid').eq(PATHPARAMS['postid'])
                )
                if username != "":
                    for item in data["Items"]:
                        likeStatus = client.get_item(
                                TableName="likescomment",
                                Key={'userid':{'S':username},'commentid':{'S':item['id']}}
                            )
                        if "Item" in likeStatus:
                            item['val'] = int(likeStatus["Item"]['val']['N'])
                parsed_data = [{
                    "id": item["id"],"content": item["content"],
                    "postid":item["postid"],
                    "datetime":item["datetime"],
                    "userid":item["userid"],
                    "username":item["userid"],
                    "numoflikes":str(item["numoflikes"]),
                    "val": 0 if "val" not in item else item['val']
                } for item in data['Items']]
                
                key = 'numoflikes'
                parsed_data.sort( key=lambda item: item[key], reverse=True )
                res['comments']=parsed_data

        elif METHOD == "POST":
            if "submitComment" in ENDPOINT:
                data = json.loads(event['body'])
                userid = PATHPARAMS['userid']
                postid = PATHPARAMS['postid']
                u_id = uuid4()
                timestamp = datetime.today().strftime('%Y-%m-%d') # casts to .0 instead of ugly .23740

                transaction = [
                    {
                        # this should
                        "Put": {
                        "TableName": "comments",
                        "Item": {
                            "id": {"S": str(u_id)},
                            "datetime": {"S": timestamp},
                            "numoflikes": {"N": '0'},
                            "userid": {"S": userid},
                            "postid": {"S":postid},
                            "content": {"S": data['content']},
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
                        'body': json.dumps({"error": str(e)})
                    }
            # transact_write_items doesnt return item so just append
            # some fields to the input dict and return it instead
            comment = data
            comment["username"] = userid
            comment["userid"] = userid
            comment["postid"] = postid
            comment["id"] = str(u_id)
            comment["datetime"] = timestamp
            comment["numoflikes"] = 0
            res["success"] = 1
            res["comment"] = comment
        elif METHOD == "DELETE":
            print("DELETE")
            if "deleteComment" in ENDPOINT:
                print("deleteComment")
                commentid = event["pathParameters"]["commentId"]
                postid = event["pathParameters"]["postId"]
                try:
                    # toDelete = client.get_item(
                    #     TableName="comments",Key={"id": {"S": commentid}}
                    #     )
                    # delete likescomment
                    likescomment_data = dynamodb.Table('likescomment').scan(
                        FilterExpression=Attr('commentid').eq(commentid)
                    )
                    write_requests = [{'DeleteRequest': {
                        'Key': {
                            'commentid':{'S':item['commentid']},
                            'userid': {'S': item['userid']}
                        }}} for item in likescomment_data['Items']]
                    batchDelete(write_requests,'likescomment')
                    
                    res = client.delete_item(
                        TableName="comments", Key={"id": {"S": commentid}}
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
        else:
            raise Exception("Invalid Request")

    except Exception as e: # invalid request
        res["success"] = 0
        return {
                'statusCode': 400,
                'body': json.dumps({"error": "Invalid request"})
        }

    # assume all went well
    return {
        "statusCode": 200,
        'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
        "body": json.dumps(res)
    }


