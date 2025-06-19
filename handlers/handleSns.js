import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Amazon SNS events.
 * Key fields:
 *  - Records[].Sns.MessageId, TopicArn, Subject and Message
 *  - Records[].Sns.Timestamp and MessageAttributes
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
 */
export default async function handleSns(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleSns', { messages: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => console.log('SNS:', r.Sns.Message));
  return { processed: event.Records.length };
}
