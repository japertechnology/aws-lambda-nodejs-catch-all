import { logDebug } from '../logger.js';

/**
 * Handle CloudWatch Logs subscription events.
 * Key fields:
 *  - awslogs.data: Base64 gzipped log payload
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-cloudwatch-logs.html#with-cloudwatch-logs-event
 */
export default async function handleCloudWatchLogs(event, context) {
  logDebug('handleCloudWatchLogs', { requestId: context.awsRequestId });
  console.log('Logs subscription payload received');
  return {};
}
