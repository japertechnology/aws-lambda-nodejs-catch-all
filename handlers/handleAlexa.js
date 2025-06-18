module.exports = async function handleAlexa(event, context) {
  /* Alexa fields:
   - event.session.sessionId
   - event.request.type, requestId, timestamp
   - event.request.intent.name, event.request.intent.slots
   - event.context.System.device.deviceId, apiEndpoint
  */
  console.log('Alexa request type:', event.request.type);
  return { version: '1.0', response: { outputSpeech: { type: 'PlainText', text: 'Hello from Alexa!' } } };
}

