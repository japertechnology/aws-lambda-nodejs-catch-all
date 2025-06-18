module.exports = async function handleSns(event, context) {
  /* SNS fields:
   - event.Records[].Sns.MessageId, TopicArn, Subject, Message
   - event.Records[].Sns.Timestamp, MessageAttributes
  */
  event.Records.forEach(r => console.log('SNS:', r.Sns.Message));
  return { processed: event.Records.length };
}

