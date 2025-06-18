module.exports = async function handleDynamoDB(event, _context) {
  /* DynamoDB Streams fields:
   - event.Records[].eventID, eventName, awsRegion
   - event.Records[].dynamodb.Keys, NewImage, OldImage
  */
  event.Records.forEach(r => console.log('DynamoDB:', r.dynamodb));
  return { processed: event.Records.length };
}

