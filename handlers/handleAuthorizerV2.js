import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle API Gateway HTTP API authorizers (v2).
 * Key fields:
 *  - type: should be 'REQUEST'
 *  - routeArn and identitySource: request metadata
 *  - requestContext.http.method: HTTP method of the call
 * See https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html
 */
export default async function handleAuthorizerV2(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleAuthorizerV2', { routeArn: event.routeArn, requestId: context.awsRequestId });
  return { isAuthorized: true, context: {} };
}
