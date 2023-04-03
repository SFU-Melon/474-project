import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    client = boto3.client('dynamodb')
    body = json.loads(event['body'])
    username = event["pathParameters"]["username"]
    endpoint = event["path"]
    res = None
    # get the current post to make sure it exists
    if (body['type'] == 'post'):
        typeTable = 'posts'
        likesTable = 'likes'
        likesQueryKey = {'postid': {
                      'S': body['votedId']
                    },
                    'userid':{
                        'S':username
                    }
                    }
        queryId = {
                'id': {
                  'S': body['votedId']
                }
            }
        
    elif (body['type'] == 'comment'):
        typeTable = 'comments'
        likesTable = 'likescomment'
        likesQueryKey = {'commentid': {
                      'S': body['votedId']['commentId']
                    },
                    'userid':{
                        'S':username
                    }
                    }
        queryId = {
                'id': {
                  'S': body['votedId']['commentId']
                }
            }
    
    try:
        data = client.get_item(
            TableName=typeTable,
            Key=queryId
          )
        postExists = data['Item']
        if (not postExists):
            raise
        
        # if post does exist, check if user has liked it yet
        likeData = client.get_item(
            TableName=likesTable,
            Key=likesQueryKey
          )
       
    except Exception as e:
        # condition check prob failed
        return {
            'statusCode': 500,
            'body': json.dumps({"get post/comments and likes failed": str(e)})
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
            # if currently downvoted, action will change to upvoted and add 2 likes
            elif (likeStatus == "-1"):
                likeStatus = 1
                numLikes += 2
            # if it is currently not liked aka val = 0, then it will update to liked (val = 1)
            else: # likeStatus = 0 indicating not liked yet
                numLikes += 1
                likeStatus = 1
                
        # handle downvote
        elif ("downVotePost" in endpoint):
            if (likeStatus == "-1"):
                likeStatus = 0
                numLikes += 1
            elif (likeStatus == "1"):
                likeStatus = -1
                numLikes -= 2
            # if it is currently not downvoted aka val = 0, then it will update to downvoted (val = 1)
            else: # likeStatus = 0 indicating not liked yet
                numLikes -= 1
                likeStatus = -1
        
        # update the user's like status in the like table to the correct value
        res = client.update_item(
            TableName=likesTable,
            Key=likesQueryKey,
            UpdateExpression="set val=:l",
            ExpressionAttributeValues={
                ':l': {"N":str(likeStatus)}},
            ReturnValues="UPDATED_NEW"
        )
       
    # if user has never voted on this before, must insert new item into likes table
    else:
        new_item = likesQueryKey
        if ("upVotePost" in endpoint):
            new_item['val'] = {"N": "1"}
            likeStatus = 1
            res = "upvoted"
        elif ("downVotePost" in endpoint):
            new_item['val'] = {"N": "-1"}
            likeStatus = -1
            res = "downvoted"
        if (body['type']=='comment'):
            new_item['p'] = {'S': body['votedId']['postId']}
        numLikes = int(postExists["numoflikes"]["N"]) + 1
        res = client.put_item(
            TableName= likesTable,
            Item= new_item,
            ConditionExpression= "attribute_not_exists(userid)"
        )
   
    res['newVoteStatus'] = likeStatus
    res['numoflikes'] = numLikes
    # finally, update number of likes in posts table accordingly.
    try:
        response = client.update_item(
            TableName=typeTable,
            Key=queryId,
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
        "body": json.dumps(res)
    }
