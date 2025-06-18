module.exports = async function handleCustomResource(event, _context) {
  /* CloudFormation Custom Resource fields:
   - event.RequestType, ServiceToken, ResponseURL
   - event.ResourceProperties
  */
  console.log('Custom Resource request:', event.RequestType);
  return {};
}

