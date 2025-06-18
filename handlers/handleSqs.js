import { logDebug } from '../logger.js';

/**
 * Handle Amazon SQS events.
 * Key fields:
 *  - Records[].messageId, receiptHandle and body
 *  - Records[].attributes and messageAttributes
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
 */
export default async function handleSqs(event, context) {
  logDebug('handleSqs', { messages: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => console.log('SQS:', r.body));
  return { processed: event.Records.length };
}
