module.exports = async function handleSqs(event, _context) {
  /* SQS fields:
   - event.Records[].messageId, receiptHandle, body
   - event.Records[].attributes, messageAttributes
  */
  event.Records.forEach(r => console.log('SQS:', r.body));
  return { processed: event.Records.length };
}

