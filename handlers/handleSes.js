import { logDebug } from '../logger.js';

/**
 * Handle Amazon SES inbound email events.
 * Key fields:
 *  - Records[].ses.mail.messageId, source and destination
 *  - Records[].ses.mail.commonHeaders.subject, from, to and date
 *  - Records[].ses.receipt verdicts and action
 * See https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-lambda.html
 */
export default async function handleSes(event, context) {
  logDebug('handleSes', { messages: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => {
    console.log('SES from:', r.ses.mail.source);
    console.log('SES subject:', r.ses.mail.commonHeaders.subject);
  });
  return { processed: event.Records.length };
}
