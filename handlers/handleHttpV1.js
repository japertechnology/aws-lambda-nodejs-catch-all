module.exports = async function handleHttpV1(event, _context) {
  /* API Gateway v1 fields:
   - event.httpMethod, event.path, event.headers
   - event.queryStringParameters, pathParameters, stageVariables
   - event.requestContext, event.body, event.isBase64Encoded
  */
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from API Gateway v1', event }) };
}

