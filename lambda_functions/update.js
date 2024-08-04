import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export const handler = async (event) => {
    // Get the current date in yyyymmdd format
    const current_time = new Date();
    const month = current_time.getMonth() + 1;
    const day = current_time.getDate();
    const date = `${current_time.getFullYear()}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
    
    // Parse the incoming data
    const body = event.queryStringParameters;

    // Ensure the body contains data
    if (!body || Object.keys(body).length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Invalid request, no data provided',
            }),
        };
    }

    // Prepare the item to be inserted into the DynamoDB table
    const item = {
        date: Number(date),
        timestamp: current_time.getTime(),
        ...body
    };

    const params = {
        TableName: 'danger',
        Item: item,
        // ConditionExpression: 'attribute_not_exists(timestamp)', // Uncomment if you want to avoid overwriting existing items
    };

    // Send the item to DynamoDB
    const command = new PutCommand(params);
    try {
        await docClient.send(command);
        return {
            statusCode: 200,
            body: 'successed',
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'something is wrong',
                error: err.message,
            }),
        };
    }
};
