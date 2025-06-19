import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle API Gateway HTTP API (v2) requests.
 * Key fields:
 *  - version === '2.0'
 *  - requestContext.http.method, rawPath and rawQueryString
 *  - headers, queryStringParameters and body
 * See https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
 */
export default async function handleHttpV2(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleHttpV2', { method: event.requestContext?.http?.method, path: event.rawPath, requestId: context.awsRequestId });
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from API Gateway v2', event }),
  };
}
