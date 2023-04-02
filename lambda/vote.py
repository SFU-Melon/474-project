import json
import boto3

def lambda_handler(event, context):
    client = boto3.client('dynamodb')
    body = json.loads(event['body'])
    username = event["pathParameters"]["username"]
    endpoint = event["path"]
    res = None
    # get the current post to make sure it exists
    try:
        data = client.get_item(
            TableName='posts',
            Key={
                'id': {
                  'S': body['votedId']
                }
            }
          )
        postExists = data['Item']
        if (not postExists):
            raise
        
        # if post does exist, check if user has liked it yet
        likeData = client.get_item(
            TableName='likes',
            Key={
                'postid': {
                  'S': body['votedId']
                },
                'userid':{
                    'S':username
                }
            }
          )
    except Exception as e:
        # condition check prob failed
        return {
            'statusCode': 500,
            'body': json.dumps({"big err": str(e)})
        }
    if ('Item' in likeData):
        likeStatus = likeData['Item']["val"]["N"]
        numLikes = int(postExists["numoflikes"]["N"])
        
        # handle upvote
        if ("upVotePost" in endpoint):
            # if it is currently liked aka val = 1, action will cancel the vote/like
            if (likeStatus=="1"):
                likeStatus = 0
                numLikes -= 1
                res = "cancelled upvote on post"
            # if currently downvoted, action will change to upvoted and add 2 likes
            elif (likeStatus == "-1"):
                likeStatus = 1
                numLikes += 2
                res = "updated to upvote from downvote"
            # if it is currently not liked aka val = 0, then it will update to liked (val = 1)
            else: # likeStatus = 0 indicating not liked yet
                numLikes += 1
                likeStatus = 1
                res = "upvoted"
                
        # handle downvote
        elif ("downVotePost" in endpoint):
            if (likeStatus == "-1"):
                likeStatus = 0
                numLikes += 1
                res = "cancelled downvote on post"
            elif (likeStatus == "1"):
                likeStatus = -1
                numLikes -= 2
                res = "updated to downvote from upvote"
            # if it is currently not downvoted aka val = 0, then it will update to downvoted (val = 1)
            else: # likeStatus = 0 indicating not liked yet
                numLikes -= 1
                likeStatus = -1
                res = "downvoted"
            
        
        # update the user's like status in the like table to the correct value
        client.update_item(
            TableName='likes',
            Key={'userid': {
                'S': username
            },'postid':{'S':body["votedId"]}},
            UpdateExpression="set val=:l",
            ExpressionAttributeValues={
                ':l': {"N":str(likeStatus)}},
            ReturnValues="UPDATED_NEW"
        )
    # if user has never voted on this before, must insert new item into likes table
    else:
        numLikes = int(postExists["numoflikes"]["N"]) + 1
        client.put_item(
            TableName= 'likes',
            Item= {
                "userid": {"S": username},
                "postid": {"S": body['votedId']},
                "val":{"N": "1"}
                },
            ConditionExpression= "attribute_not_exists(userid)"
        )
   
    
    # finally, update number of likes in posts table accordingly.
    try:
        response = client.update_item(
            TableName='posts',
            Key={'id': {
                'S': body['votedId']
            }},
            UpdateExpression="set numoflikes=:l",
            ExpressionAttributeValues={
                ':l': {"N":str(numLikes)}},
            ReturnValues="UPDATED_NEW")
            
    except Exception as err:
        return {
        'statusCode': 500,
        'body': json.dumps({"error": str(err)})
        }
    
    
    
    return {
        "statusCode": 200,
        'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
        "body": res
    }
