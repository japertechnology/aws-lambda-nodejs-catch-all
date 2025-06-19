import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle API Gateway WebSocket events.
 * Key fields:
 *  - requestContext.routeKey: route matched for the message
 *  - requestContext.connectionId: connection identifier
 *  - domainName and stage: WebSocket endpoint info
 *  - body: payload from the client
 * See https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-integration-lambda.html
 */
export default async function handleWebSocket(event, context) {
  const invocation = collectInvocation(event, context, 'webSocket');
  logDebug('invocation', invocation);
  logDebug('handleWebSocket', { routeKey: event.requestContext?.routeKey, requestId: context.awsRequestId });
  console.log('WebSocket route:', event.requestContext.routeKey);
  return { statusCode: 200, body: 'WebSocket message received' };
}
