import { logDebug } from '../logger.js';

/**
 * Handle Kinesis stream events.
 * Key fields:
 *  - Records[].eventID and kinesis.partitionKey
 *  - Records[].kinesis.data and approximateArrivalTimestamp
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html
 */
export default async function handleKinesis(event, context) {
  logDebug('handleKinesis', { records: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => {
    const data = Buffer.from(r.kinesis.data, 'base64').toString('utf8');
    console.log('Kinesis:', data);
  });
  return { processed: event.Records.length };
}
