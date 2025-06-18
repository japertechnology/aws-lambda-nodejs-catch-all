module.exports = async function handleAuthorizerV1(event, _context) {
  /* Authorizer v1 fields:
   - event.type === 'TOKEN'
   - event.authorizationToken
   - event.methodArn
  */
  return { principalId: 'user', policyDocument: { Version: '2012-10-17', Statement: [{ Action: 'execute-api:Invoke', Effect: 'Allow', Resource: event.methodArn }] } };
}

