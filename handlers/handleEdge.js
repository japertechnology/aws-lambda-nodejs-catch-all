import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Lambda@Edge viewer requests.
 * Key fields:
 *  - Records[0].cf.config.eventType and distributionId
 *  - Records[0].cf.request.uri, method and headers
 * See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
 */
export default async function handleEdge(event, context) {
  const invocation = collectInvocation(event, context, 'edge');
  logDebug('invocation', invocation);
  logDebug('handleEdge', { eventType: event.Records?.[0]?.cf?.config?.eventType, requestId: context.awsRequestId });
  const request = event.Records[0].cf.request;
  return request;
}
