from datetime import datetime
from uuid import uuid4
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3
# have to import this namespace individually
from boto3.dynamodb.conditions import Attr
    
def lambda_handler( event, context ):
    """Setup DB connection"""
    client = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('comments')
    # use the DynamoDB object to select our table
    ENDPOINT = event["path"]
    PATHPARAMS = event["pathParameters"]
    res = {}
    """Handle Requests"""
    try:
        if "getComments" in ENDPOINT:
            
            data = table.scan(
                FilterExpression=Attr('postid').eq(PATHPARAMS['postid'])
            )
            parsed_data = [{"id": item["id"],"content": item["content"],"postid":item["postid"],"datetime":item["datetime"],
                "userid":item["userid"],"username":item["userid"],"numoflikes":str(item["numoflikes"])
            } for item in data['Items']]
            
            key = 'numoflikes'
            parsed_data.sort( key=lambda item: item[key], reverse=True )
            res['comments']=parsed_data
    
        elif "submitComment" in ENDPOINT:
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
            comment["id"] = str(u_id)
            comment["datetime"] = timestamp
            comment["numoflikes"] = 0
            res["success"] = 1
            res["comment"] = comment


    except Exception as e: # invalid request
        # raise Exception("Invalid request")
        res["success"] = 0
        return {
                'statusCode': 400,
                'body': json.dumps({"error": str(e)})
        }

    # assume all went well
    return {
        "statusCode": 200,
        'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
        "body": json.dumps(res)
    }


