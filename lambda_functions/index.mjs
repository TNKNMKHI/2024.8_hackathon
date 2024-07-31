const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
});


const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export const handler = async (event) => {
    // レスポンスデータの作成
    const current_time = new Date();
    const date = current_time.getFullYear() + (current_time.getMonth() + 1) + current_time.getDate();

    const params = {
        TableName: 'danger',
        Item: {
            number: 1, 
            date: date, 
            what: 20, 
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

function 
