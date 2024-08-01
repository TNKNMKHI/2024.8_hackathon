import { DynamoDBClient }  from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const main = async () => {
  const command = new ListTablesCommand({});

  const response = await client.send(command);
  console.log(response);
  return response;
};