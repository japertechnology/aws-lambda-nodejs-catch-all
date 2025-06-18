module.exports = async function handleEventBridge(event, context) {
  /* EventBridge fields:
   - event.version, id, 'detail-type', source
   - event.account, region, time, resources, detail
  */
  console.log('EventBridge event:', event['detail-type']);
  return { processed: true };
}

