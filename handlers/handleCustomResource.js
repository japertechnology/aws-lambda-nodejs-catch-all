import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle CloudFormation custom resources.
 *
 * Dispatch criteria: invoked when `event.RequestType` and
 * `event.ResponseURL` are present.
 *
 * Available event fields:
 *  - `RequestType`, `ServiceToken` and `ResponseURL` identify the request.
 *  - `ResourceProperties`: user-defined properties for the resource.
 * The Lambda `context` object is provided for request metadata.
 *
 * See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref-requests.html
 */
export default async function handleCustomResource(event, context) {
  const invocation = collectInvocation(event, context, 'customResource');
  logDebug('invocation', invocation);
  logDebug('handleCustomResource', { requestType: event.RequestType, requestId: context.awsRequestId });
  console.log('Custom Resource request:', event.RequestType);
  return {};
}
