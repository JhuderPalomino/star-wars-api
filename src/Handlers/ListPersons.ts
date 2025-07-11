import { APIGatewayProxyCallback, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Server } from '../Apps/Server';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;
  const instanceApp: Server = new Server();
  return instanceApp.getApp().run(event, context, callback);
};
