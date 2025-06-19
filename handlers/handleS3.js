import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Amazon S3 events.
 * Key fields:
 *  - Records[].s3.bucket.name and arn
 *  - Records[].s3.object.key, size and eTag
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html
 */
export default async function handleS3(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleS3', { records: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => console.log('S3:', r.s3.bucket.name, r.s3.object.key));
  return { processed: event.Records.length };
}
