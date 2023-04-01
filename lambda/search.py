import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    """Setup DB connection"""
    # create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    client = boto3.client('dynamodb')
    METHOD = event["httpMethod"]
    ENDPOINT = event["path"]
    res = None

    """Handle Requests"""
    if METHOD == 'GET':
        print('GET')
        if 'search' in ENDPOINT:
            scope = event['pathParameters']['scope']
            value = event['pathParameters']['value']

            if scope == 'posts':
                try:
                    data = client.scan(
                        TableName='posts',
                        FilterExpression='contains(#t, :value) or contains(#c, :value) or contains(#l, :value)',
                        ExpressionAttributeNames={
                            '#t': 'title',
                            '#c': 'content',
                            '#l': 'location'
                        },
                        ExpressionAttributeValues={
                            ':value': {'S': value}
                        }
                    )

                    parsed_data = [{"id": item["id"]["S"],"content": item["content"]["S"],"location":item["location"]["S"],"datetime":item["datetime"]["S"],
                        "title":item["title"]["S"],"imageurl":item["imageurl"]["S"], "numoflikes":item["numoflikes"]["N"], "userId":item["userId"]["S"], "authorname":item["userId"]["S"]
                    } for item in data['Items']]
                    res=parsed_data

                except Exception as e:
                    return {
                        'statusCode': 500,
                        'body': json.dumps({"error": str(e)})
                    }

            elif scope == 'users':
                try:
                    data = client.scan(
                        TableName='users',
                        FilterExpression='contains(#id, :value) or contains(#fn, :value) or contains(#ln, :value)',
                        ExpressionAttributeNames={
                            '#id': 'id',
                            '#fn': 'fname',
                            '#ln': 'lname'
                        },
                        ExpressionAttributeValues={
                            ':value': {'S': value}
                        }
                    )

                    parsed_data = [{"userId":item["id"]["S"], "fname":item["fname"]["S"], "lname":item["lname"]["S"]
                    } for item in data['Items']]
                    res=parsed_data

                except Exception as e:
                        return {
                            'statusCode': 500,
                            'body': json.dumps({"error": str(e)})
                        }

    else: # invalid request
        return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
                'body': json.dumps({"error": "Invalid request"})
        }

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
        'body': json.dumps(res)
    }
