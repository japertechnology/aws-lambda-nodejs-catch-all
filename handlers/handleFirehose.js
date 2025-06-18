module.exports = async function handleFirehose(event, context) {
  /* Firehose fields:
   - event.records[].recordId, approximateArrivalTimestamp
   - event.records[].data (Base64)
  */
  const output = event.records.map(r => ({ recordId: r.recordId, result: 'Ok', data: r.data }));
  return { records: output };
}

