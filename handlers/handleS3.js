module.exports = async function handleS3(event, _context) {
  /* S3 fields:
   - event.Records[].s3.bucket.name, arn
   - event.Records[].s3.object.key, size, eTag
  */
  event.Records.forEach(r => console.log('S3:', r.s3.bucket.name, r.s3.object.key));
  return { processed: event.Records.length };
}

