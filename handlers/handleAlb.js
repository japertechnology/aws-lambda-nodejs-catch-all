module.exports = async function handleAlb(event, _context) {
  /* ALB fields:
   - event.requestContext.elb.targetGroupArn
   - event.httpMethod, event.path, queryStringParameters
   - event.headers, event.body, event.isBase64Encoded
  */
  return { statusCode: 200, statusDescription: '200 OK', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello from ALB', event }) };
}

