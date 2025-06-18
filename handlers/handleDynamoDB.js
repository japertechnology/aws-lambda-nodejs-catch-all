import { logDebug } from '../logger.js';

/**
 * Handle DynamoDB Streams events.
 * Key fields:
 *  - Records[].eventID, eventName and awsRegion
 *  - Records[].dynamodb.Keys, NewImage and OldImage
 * See https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html
 */
export default async function handleDynamoDB(event, context) {
  logDebug('handleDynamoDB', { records: event.Records?.length, requestId: context.awsRequestId });
  event.Records.forEach(r => console.log('DynamoDB:', r.dynamodb));
  return { processed: event.Records.length };
}
