import { logDebug } from '../logger.js';

/**
 * Handle AWS IoT Rule triggers.
 * Key fields:
 *  - clientId and principalId: identify the client
 *  - topic: MQTT topic that triggered the rule
 *  - payload: message payload
 *  - timestamp: message timestamp
 * See https://docs.aws.amazon.com/lambda/latest/dg/services-iot.html
 */
export default async function handleIoTRule(event, context) {
  logDebug('handleIoTRule', { topic: event.topic, requestId: context.awsRequestId });
  console.log('IoT topic:', event.topic);
  return { processed: true };
}
