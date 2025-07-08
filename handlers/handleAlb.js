import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Application Load Balancer requests.
 *
 * Dispatch criteria: the dispatcher selects this handler when
 * `event.requestContext.elb` is defined.
 *
 * Available event fields:
 *  - `requestContext.elb.targetGroupArn`: the target group ARN.
 *  - `httpMethod`, `path` and `queryStringParameters` describe the request.
 *  - `headers`, `body` and `isBase64Encoded` contain the payload.
 * The standard Lambda `context` object is also provided during execution.
 *
 * See https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#request-body
 */
export default async function handleAlb(event, context) {
  const invocation = collectInvocation(event, context, 'alb');
  logDebug('invocation', invocation);
  logDebug('handleAlb', { method: event.httpMethod, path: event.path, requestId: context.awsRequestId });
  return {
    statusCode: 200,
    statusDescription: '200 OK',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from ALB', event }),
  };
}
