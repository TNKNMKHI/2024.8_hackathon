import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
});

// ここで、↑で初期化したDynamoDBClientを用いてDynamoDBDocumentClientを初期化
const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params: PutCommandInput = {
        TableName: 'danger',
        Item: {
            number: 1, // ここが違う！
            date: 1, // ここが違う！
            what: 8, // ここが違う！
        },
    };
    const command = new PutCommand(params);
    try {
        await docClient.send(command);
        return {
            statusCode: 200,
            body: 'success',
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};