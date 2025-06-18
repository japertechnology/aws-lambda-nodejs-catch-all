module.exports = async function handleStepFunctions(event, context) {
  /* Step Functions fields:
   - event.execution.eventId, name, input
   - event.stateMachineArn
  */
  console.log('StepFunctions execution:', event.execution.name);
  return { status: 'SUCCEEDED', output: event.execution.input };
}

