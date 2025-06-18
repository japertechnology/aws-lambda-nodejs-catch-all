import { logDebug } from '../logger.js';

/**
 * Handle AWS Step Functions task invocations.
 * Key fields:
 *  - execution.eventId/name/input: details of the running execution
 *  - stateMachineArn: ARN of the state machine
 * See https://docs.aws.amazon.com/step-functions/latest/dg/connect-lambda.html#connect-lambda-input-output
 */
export default async function handleStepFunctions(event, context) {
  logDebug('handleStepFunctions', { executionId: event.execution?.eventId, requestId: context.awsRequestId });
  console.log('StepFunctions execution:', event.execution.name);
  return { status: 'SUCCEEDED', output: event.execution.input };
}
