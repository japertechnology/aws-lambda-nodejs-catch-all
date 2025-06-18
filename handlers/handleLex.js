module.exports = async function handleLex(event, context) {
  /* Lex fields:
   - event.bot.name, alias, version
   - event.userId
   - event.inputTranscript
   - event.currentIntent.name, slots, confirmationStatus
   - event.invocationSource
  */
  console.log('Lex intent:', event.currentIntent.name);
  return { sessionAttributes: {}, dialogAction: { type: 'Close', fulfillmentState: 'Fulfilled', message: { contentType: 'PlainText', content: 'Hello from Lex!' } } };
}

