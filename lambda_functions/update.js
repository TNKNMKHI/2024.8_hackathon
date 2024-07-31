import { DynamoDBClient }  from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamodbClient = new DynamoDBClient({
    region: 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(dynamodbClient);

export const handler = async (event) => {
    // レスポンスデータの作成
    // yyyymmddの型で date を管理する
    const current_time = new Date();
    let month = current_time.getMonth() + 1;
    if (month < 10) {
      month = "0" + String(month);
    } else {
      month = String(month);
    }
    const date = String(current_time.getFullYear()) + month + String(current_time.getDate());
    
    // 各パラメータをセット
    const params = {
        TableName: 'danger',
        Item: {
            number: event.number || 1, 
            date: Number(date),
            what: event.what || "安倍晋三ウンチ",
            timestamp: current_time.getTime(), // タイムスタンプを追加
        },
        ConditionExpression: 'attribute_not_exists(timestamp)', // number属性が存在しない場合にのみ書き込み
    };

    // パラメータをdynamoDBに送信
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
