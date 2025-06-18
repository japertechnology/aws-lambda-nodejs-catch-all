module.exports = async function handleKinesis(event, context) {
  /* Kinesis fields:
   - event.Records[].eventID, kinesis.partitionKey
   - event.Records[].kinesis.data, approximateArrivalTimestamp
  */
  event.Records.forEach(r => {
    const data = Buffer.from(r.kinesis.data, 'base64').toString('utf8');
    console.log('Kinesis:', data);
  });
  return { processed: event.Records.length };
}

