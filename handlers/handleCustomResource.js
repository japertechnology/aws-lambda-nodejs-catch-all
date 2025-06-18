import { logDebug } from '../logger.js';

/**
 * Handle CloudFormation custom resources.
 * Key fields:
 *  - RequestType, ServiceToken and ResponseURL
 *  - ResourceProperties: user-defined properties
 * See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref-requests.html
 */
export default async function handleCustomResource(event, context) {
  logDebug('handleCustomResource', { requestType: event.RequestType, requestId: context.awsRequestId });
  console.log('Custom Resource request:', event.RequestType);
  return {};
}
