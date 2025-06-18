module.exports = async function handleSes(event, context) {
  /* SES fields:
   - event.Records[].ses.mail.messageId, source, destination
   - event.Records[].ses.mail.commonHeaders.subject, from, to, date
   - event.Records[].ses.receipt.spfVerdict, dkimVerdict, spamVerdict, virusVerdict
   - event.Records[].ses.receipt.action.type, functionArn
  */
  event.Records.forEach(r => {
    console.log('SES from:', r.ses.mail.source);
    console.log('SES subject:', r.ses.mail.commonHeaders.subject);
  });
  return { processed: event.Records.length };
}

