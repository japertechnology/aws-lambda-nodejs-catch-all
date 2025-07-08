import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Fallback handler for unrecognized events.
 *
 * Dispatch criteria: executed when no other handler matches the event.
 *
 * Available context fields:
 *  - `context.awsRequestId`, `logGroupName` and `logStreamName` identify the invocation.
 *  - `context.functionName` and `memoryLimitInMB` describe the function.
 * See https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 */
export default async function handleDefault(event, context) {
  const invocation = collectInvocation(event, context, 'default');
  logDebug('invocation', invocation);
  logDebug('handleDefault', { requestId: context.awsRequestId });
  console.warn('Unhandled event type');
  return { fallback: true };
}
