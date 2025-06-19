import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle EventBridge events.
 * Key fields:
 *  - version, id, detail-type and source
 *  - account, region, time, resources and detail
 * See https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-lambda.html
 */
export default async function handleEventBridge(event, context) {
  const invocation = collectInvocation(event, context, 'eventBridge');
  logDebug('invocation', invocation);
  logDebug('handleEventBridge', { detailType: event['detail-type'], requestId: context.awsRequestId });
  console.log('EventBridge event:', event['detail-type']);
  return { processed: true };
}
