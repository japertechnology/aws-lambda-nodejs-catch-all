module.exports = async function handleCustomResource(event, context) {
  /* CloudFormation Custom Resource fields:
   - event.RequestType, ServiceToken, ResponseURL
   - event.ResourceProperties
  */
  console.log('Custom Resource request:', event.RequestType);
  return {};
}

