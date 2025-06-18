module.exports = async function handleIoTRule(event, context) {
  /* IoT Rule fields:
   - event.clientId, principalId
   - event.topic
   - event.payload
   - event.timestamp
  */
  console.log('IoT topic:', event.topic);
  return { processed: true };
}

