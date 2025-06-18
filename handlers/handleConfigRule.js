module.exports = async function handleConfigRule(event, _context) {
  /* Config Rule fields:
   - event.invokingEvent
   - event.ruleParameters
   - event.resultToken
  */
  console.log('Config rule invoke:', event.invokingEvent);
  return { complianceType: 'COMPLIANT', annotation: 'Default OK' };
}

