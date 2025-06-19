import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Fallback handler for unrecognized events.
 * Key fields:
 *  - context.awsRequestId, logGroupName and logStreamName
 *  - context.functionName and memoryLimitInMB
 * See https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 */
export default async function handleDefault(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleDefault', { requestId: context.awsRequestId });
  console.warn('Unhandled event type');
  return { fallback: true };
}
