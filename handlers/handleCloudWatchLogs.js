import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle CloudWatch Logs subscription events.
 * Key fields:
 *  - awslogs.data: Base64 gzipped log payload
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-cloudwatch-logs.html#with-cloudwatch-logs-event
 */
export default async function handleCloudWatchLogs(event, context) {
  const invocation = collectInvocation(event, context, 'cloudWatchLogs');
  logDebug('invocation', invocation);
  logDebug('handleCloudWatchLogs', { requestId: context.awsRequestId });
  console.log('Logs subscription payload received');
  return {};
}
