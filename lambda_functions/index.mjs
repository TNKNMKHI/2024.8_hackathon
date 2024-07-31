import { DynamoDBClient }  from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
});


const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export const handler = async (event) => {
    // レスポンスデータの作成
    const current_time = new Date();
    let month = current_time.getMonth() + 1;
    if (month < 10) {
      month = "0" + String(month);
    } else {
      month = String(month);
    }

    const date = String(current_time.getFullYear()) + month + String(current_time.getDate());

    const params = {
        TableName: 'danger',
        Item: {
            number: 1, 
            date: Number(date), 
            what: "安倍晋三ウンチ", 
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
