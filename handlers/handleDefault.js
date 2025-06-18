import { logDebug } from '../logger.js';

/**
 * Fallback handler for unrecognized events.
 * Key fields:
 *  - context.awsRequestId, logGroupName and logStreamName
 *  - context.functionName and memoryLimitInMB
 * See https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 */
export default async function handleDefault(event, context) {
  logDebug('handleDefault', { requestId: context.awsRequestId });
  console.warn('Unhandled event type');
  return { fallback: true };
}
