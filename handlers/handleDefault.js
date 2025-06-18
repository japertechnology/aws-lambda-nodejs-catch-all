module.exports = async function handleDefault(event, context) {
  /* Fallback fields:
   - context.awsRequestId, logGroupName, logStreamName
   - context.functionName, memoryLimitInMB
  */
  console.warn('Unhandled event type');
  return { fallback: true };
}

