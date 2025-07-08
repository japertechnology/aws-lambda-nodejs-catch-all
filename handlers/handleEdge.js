import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Lambda@Edge viewer requests.
 *
 * Dispatch criteria: runs when `event.Records[0].cf` exists.
 *
 * Available event fields:
 *  - `Records[0].cf.config.eventType` and `distributionId` describe the request type.
 *  - `Records[0].cf.request.uri`, `method` and `headers` contain the HTTP data.
 * The Lambda `context` object holds invocation metadata.
 *
 * See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
 */
export default async function handleEdge(event, context) {
  const invocation = collectInvocation(event, context, 'edge');
  logDebug('invocation', invocation);
  logDebug('handleEdge', { eventType: event.Records?.[0]?.cf?.config?.eventType, requestId: context.awsRequestId });
  const request = event.Records[0].cf.request;
  return request;
}
