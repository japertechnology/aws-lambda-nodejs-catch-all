module.exports = async function handleSqs(event, context) {
  /* SQS fields:
   - event.Records[].messageId, receiptHandle, body
   - event.Records[].attributes, messageAttributes
  */
  event.Records.forEach(r => console.log('SQS:', r.body));
  return { processed: event.Records.length };
}

