import { logDebug } from '../logger.js';

/**
 * Handle Application Load Balancer requests.
 * Key fields:
 *  - requestContext.elb.targetGroupArn: target group ARN
 *  - httpMethod, path and queryStringParameters
 *  - headers, body and isBase64Encoded
 * See https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#request-body
 */
export default async function handleAlb(event, context) {
  logDebug('handleAlb', { method: event.httpMethod, path: event.path, requestId: context.awsRequestId });
  return {
    statusCode: 200,
    statusDescription: '200 OK',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from ALB', event }),
  };
}
