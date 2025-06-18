import { logDebug } from '../logger.js';

/**
 * Handle scheduled CloudWatch events.
 * Key fields:
 *  - version, id and detail-type
 *  - source === 'aws.events'
 *  - account, region, time and resources
 * See https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html
 */
export default async function handleScheduled(event, context) {
  logDebug('handleScheduled', { time: event.time, requestId: context.awsRequestId });
  console.log('Scheduled event at:', event.time);
  return { processed: true };
}
