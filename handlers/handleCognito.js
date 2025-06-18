module.exports = async function handleCognito(event, _context) {
  /* Cognito Trigger fields:
   - event.triggerSource, event.userPoolId, event.userName
   - event.request, event.response
  */
  console.log('Cognito trigger:', event.triggerSource);
  return event;
}

