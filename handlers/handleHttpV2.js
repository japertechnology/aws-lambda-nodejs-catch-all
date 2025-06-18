module.exports = async function handleHttpV2(event, _context) {
  /* API Gateway v2 fields:
   - event.version === '2.0'
   - event.requestContext.http.method, rawPath, rawQueryString
   - event.headers, event.queryStringParameters, event.body
  */
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from API Gateway v2', event }) };
}

