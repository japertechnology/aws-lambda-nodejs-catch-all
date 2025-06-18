module.exports = async function handleScheduled(event, context) {
  /* Scheduled CloudWatch fields:
   - event.version, id, 'detail-type' === 'Scheduled Event'
   - event.source === 'aws.events'
   - event.account, region, time, resources
  */
  console.log('Scheduled event at:', event.time);
  return { processed: true };
}

