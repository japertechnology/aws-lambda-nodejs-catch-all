module.exports = async function handleCloudWatchLogs(_event, _context) {
  /* CloudWatch Logs fields:
   - event.awslogs.data (Base64 gzipped payload)
  */
  console.log('Logs subscription payload received');
  return {};
}

