import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle API Gateway REST API (v1) requests.
 *
 * Dispatch criteria: invoked when `event.httpMethod` is present.
 *
 * Available event fields:
 *  - `httpMethod` and `path` describe the HTTP request.
 *  - `headers`, `queryStringParameters`, `pathParameters`.
 *  - `requestContext` and `body` hold additional request details.
 * The Lambda `context` object contains invocation metadata.
 *
 * See https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
 */
export default async function handleHttpV1(event, context) {
  const invocation = collectInvocation(event, context, 'httpV1');
  logDebug('invocation', invocation);
  logDebug('handleHttpV1', { method: event.httpMethod, path: event.path, requestId: context.awsRequestId });
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from API Gateway v1', event }),
  };
}
