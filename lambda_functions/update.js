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
    let day = current_time.getDate();
    if (month < 10) {
      month = "0" + String(month);
    } else {
      month = String(month);
    }
    if (day < 10) {
        day = "0" + String(day);
      } else {
        day = String(day);
      }

    const date = String(current_time.getFullYear()) + month + day;
    
    // 何が起きたのかを what に格納する
    const body = event.queryStringParameters;
    let what = "馬鹿みたいなエンドポイントだないつも";
    if (body) {
        what = body.what;
    }
    
    // 各パラメータをセット
    const params = {
        TableName: 'danger',
        Item: {
            date: current_time.getTime(),
            timestamp: Number(date),
            what: what,
        },
        // ConditionExpression: 'attribute_not_exists(timestamp)', // number属性が存在しない場合にのみ書き込み
    };

    // パラメータをdynamoDBに送信
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
            }),
        };
    }
};
