module.exports = async function handleEdge(event, context) {
  /* Lambda@Edge fields:
   - event.Records[0].cf.config.eventType, distributionId
   - event.Records[0].cf.request.uri, method, headers
  */
  const request = event.Records[0].cf.request;
  return request;
}

