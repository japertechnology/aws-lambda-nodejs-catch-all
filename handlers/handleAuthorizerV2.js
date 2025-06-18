module.exports = async function handleAuthorizerV2(event, context) {
  /* Authorizer v2 fields:
   - event.type === 'REQUEST'
   - event.routeArn, event.identitySource
   - event.requestContext.http.method
  */
  return { isAuthorized: true, context: {} };
}

