import { logDebug } from '../logger.js';

/**
 * Handle Kinesis Firehose data transformation events.
 * Key fields:
 *  - records[].recordId: identifier for each incoming record
 *  - records[].data: Base64 encoded payload
 *  - records[].approximateArrivalTimestamp: when the record arrived
 * See https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#lambda-transformation-event
 */
export default async function handleFirehose(event, context) {
  logDebug('handleFirehose', { count: event.records?.length, requestId: context.awsRequestId });
  const output = event.records.map(r => ({ recordId: r.recordId, result: 'Ok', data: r.data }));
  return { records: output };
}
