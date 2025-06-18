module.exports = async function handleWebSocket(event, context) {
  /* WebSocket fields:
   - event.requestContext.routeKey, connectionId, domainName, stage
   - event.body
  */
  console.log('WebSocket route:', event.requestContext.routeKey);
  return { statusCode: 200, body: 'WebSocket message received' };
}

