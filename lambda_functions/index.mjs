const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const dynamodbClient = new DynamoDBClient({
    region: 'ap-northeast-1',
});

// ここで、↑で初期化したDynamoDBClientを用いてDynamoDBDocumentClientを初期化
const docClient = DynamoDBDocumentClient.from(dynamodbClient);

exports.lambdaHandler = async (event) => {
    const params = {
        TableName: 'danger',
        Item: {
            number: 11, // ここが違う！
            date: 4, // ここが違う！
            what: 20, // ここが違う！
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
